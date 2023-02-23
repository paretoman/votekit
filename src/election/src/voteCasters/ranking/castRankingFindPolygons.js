/** @module */

import { copyArrayShallow } from '../../election/jsHelpers.js'
import equidistantLine from '../plurality/equidistantLine.js'
import splitConvex from './splitConvex.js'

/**
 * Make polygons for each group of voters that gives a unique ranking.
 * Divide a starting polygon into smaller polygons.
 * Use a dividing line for each pair of candidates.
 * @param {object} voterGeom
 * @param {number[][]} canPoints
 */
export default function castRankingFindPolygons(voterGeom, canPoints) {
    /* Start with polygons for each voterGeom
    * At each division, increment the borda score for the closer candidate.
    * The resulting borda score is nearly the opposite of the ranking. n-i-1.
    */
    // Just keep dividing up the polygons for each pair.
    // Keep track of the indexes of who won, too.

    // start with polygons for voterGeom
    const voterPoly = makeCircle(voterGeom)
    let cells = [voterPoly]

    const n = canPoints.length
    let bordaScore = [Array(n).fill(0)]

    for (let i = 0; i < n - 1; i++) {
        for (let k = i + 1; k < n; k++) {
            const cn = cells.length
            // split cells with voronoi, guess how many cells
            // the number of cells will only increase, so start with cn and add more if needed
            const newCells = Array(cn)
            const newBordaScore = Array(cn)

            let o = 0
            for (let m = 0; m < cn; m++) {
                const subject = cells[m]

                const plane = equidistantLine(canPoints[i], canPoints[k])

                const newC = splitConvex(subject, plane)

                // sometimes near-zero-area polygons are formed that need to be removed
                // because they also have rankings that don't make sense.
                const pos = newC.positive
                if (pos !== undefined && pos.length > 2) {
                    newCells[o] = pos

                    newBordaScore[o] = copyArrayShallow(bordaScore[m])
                    newBordaScore[o][k] += 1

                    o += 1
                }
                const neg = newC.negative
                if (neg !== undefined && neg.length > 2) {
                    newCells[o] = neg

                    newBordaScore[o] = copyArrayShallow(bordaScore[m])
                    newBordaScore[o][i] += 1

                    o += 1
                }
            }
            cells = newCells
            bordaScore = newBordaScore
        }
    }
    const cn = cells.length
    const rankings = Array(cn)
    const cansByRankList = Array(cn)
    for (let i = 0; i < cn; i++) {
        rankings[i] = Array(n)
        cansByRankList[i] = Array(n)
        for (let k = 0; k < n; k++) {
            cansByRankList[i][k] = []
        }
        for (let k = 0; k < n; k++) {
            const rik = n - bordaScore[i][k]
            rankings[i][k] = rik
            cansByRankList[i][rik - 1].push(k)
        }
    }
    const rankingPolygons2D = { cells, rankings, cansByRankList }
    return rankingPolygons2D
}

/**
 * Make an approximate circle.
 * @param {object} voterGeom
 */
function makeCircle(voterGeom) {
    const { x, y, w } = voterGeom
    const r = w / 2
    const n = 100
    const circle = Array(n)
    for (let i = 0; i < n; i++) {
        const frac = i / (n - 1)
        const angle = 2 * Math.PI * frac
        const px = x + r * Math.cos(angle)
        const py = y + r * Math.sin(angle)
        circle[i] = [px, py]
    }
    return circle
}
