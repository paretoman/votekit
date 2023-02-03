/** @module */

import { copyArrayShallow } from '../../../utilities/jsHelpers.js'
import { equidistantLine } from '../plurality/CastPluralitySummer2DQuadrature.js'
import splitConvex from './splitConvex.js'

/**
 * Make polygons for each group of voters that gives a unique ranking.
 * Divide a starting polygon into smaller polygons.
 * Use a dividing line for each pair of candidates.
 * @param {Object} voterGeom
 * @param {Object[]} canGeoms
 * @constructor
 */
export default function castRankingFindPolygons(voterGeom, canGeoms) {
    /* Start with polygons for each voterGeom
    * At each division, increment the borda score for the closer candidate.
    * The resulting borda score is nearly the opposite of the ranking. n-i-1.
    */
    // Just keep dividing up the polygons for each pair.
    // Keep track of the indexes of who won, too.

    // start with polygons for voterGeom
    const voterPoly = makeCircle(voterGeom)
    let cells = [voterPoly]

    const n = canGeoms.length
    let bordaScore = [Array(n).fill(0)]

    for (let i = 0; i < n - 1; i++) {
        for (let k = i + 1; k < n; k++) {
            const cn = cells.length
            // split cells with voronoi, guess how many cells
            const newCells = Array(cn * 2)
            const newBordaScore = Array(cn * 2)

            let o = 0
            for (let m = 0; m < cn; m++) {
                const subject = cells[m]

                const plane = eqPlane(canGeoms[i], canGeoms[k])

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
            newCells.splice(o)
            newBordaScore.splice(o)
            cells = newCells
            bordaScore = newBordaScore
        }
    }
    const cn = cells.length
    const ranking = Array(cn)
    const cansByRankList = Array(cn)
    for (let i = 0; i < cn; i++) {
        ranking[i] = Array(n)
        cansByRankList[i] = Array(n)
        for (let k = 0; k < n; k++) {
            cansByRankList[i][k] = []
        }
        for (let k = 0; k < n; k++) {
            const rik = n - bordaScore[i][k]
            ranking[i][k] = rik
            cansByRankList[i][rik - 1].push(k)
        }
    }
    return { cells, ranking, cansByRankList }
}

/**
 * Make an approximate circle.
 * @param {Object} voterGeom
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

function eqPlane(c1, c2) {
    const { A, b } = equidistantLine(c1, c2)
    return [A.x, A.y, -b]
}
