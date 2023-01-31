/** @module */

import CastPairwiseSummer1DIntervals from './CastPairwiseSummer1DIntervals.js'
import CastPairwiseSummer2DPolygons from './CastPairwiseSummer2DPolygons.js'
import CastPairwiseSummerGrid from './CastPairwiseSummerGrid.js'

/**
 * Vote for one.
 * Voters cast votes for candidates.
 * There is also a separate graphical representation in VoronoiRanking2D.js.
 * @param {Objects[]} canGeoms - For 2D, an array of objects: {x,y}.
 * For 1D, an array of objects: {x}.
 * @param {Objects[]} voterGeoms - For 2D, an array of objects: {x,y,w}.
 * For 1D, an array of objects: {x,w,densityProfile}.
 * @returns votes, an object
 */
export default function castPairwise({ canGeoms, voterGeoms, dimensions, parties }, castOptions) {
    const SummerLines = (dimensions === 1)
        ? CastPairwiseSummer1DIntervals
        : CastPairwiseSummer2DPolygons
    const someGaussian2D = voterGeoms.some((v) => v.densityProfile === 'gaussian') && dimensions === 2

    const Summer = (someGaussian2D) ? CastPairwiseSummerGrid : SummerLines
    const summer = new Summer(canGeoms, castOptions, dimensions)

    // get fraction of votes for each candidate so we can summarize results
    let totalAreaAll = 0

    // should ideally make a set of polygons for each ranking so that we avoid repeating rankings.

    const n = canGeoms.length
    const areaAll = Array(n).fill(0)
    for (let i = 0; i < n; i++) {
        areaAll[i] = Array(n).fill(0)
    }
    const votesByGeom = []
    voterGeoms.forEach((voterGeom, g) => {
        const weight = ((voterGeom.weight === undefined) ? 1 : voterGeom.weight)

        const votesForGeom = summer.sumArea(voterGeom, weight)
        votesByGeom[g] = votesForGeom
        const { area, totalArea } = votesForGeom

        for (let i = 0; i < n; i++) {
            for (let k = 0; k < n; k++) {
                areaAll[i][k] += area[i][k]
            }
        }
        totalAreaAll += totalArea
    })
    const pairwiseTallyFractions = areaAll.map((x) => x.map((a) => a / totalAreaAll))

    // measure number of wins
    const tallyWins = Array(n).fill(0)
    for (let i = 0; i < n - 1; i++) {
        for (let k = i + 1; k < n; k++) {
            const ik = pairwiseTallyFractions[i][k]
            const ki = pairwiseTallyFractions[k][i]
            if (ik > ki) {
                tallyWins[i] += 1
            } else if (ik < ki) {
                tallyWins[k] += 1
            }
            // nobody gets points for a tie
        }
    }
    const tallyFractions = tallyWins.map((x) => x / (n - 1))
    const votes = { pairwiseTallyFractions, tallyFractions, votesByGeom, parties }
    return votes
}
