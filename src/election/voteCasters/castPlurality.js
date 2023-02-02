/** @module */

import CastPluralitySummer2DQuadrature from './CastPluralitySummer2DQuadrature.js'
import CastPluralitySummer1DIntervals from './CastPluralitySummer1DIntervals.js'
import CastPluralitySummerGrid from './CastPluralitySummerGrid.js'

/**
 * Vote for one.
 * Voters cast votes for candidates.
 * There is also a separate graphical representation in Voronoi2D.js.
 * @param {Objects[]} canGeoms - For 2D, an array of objects: {x,y}.
 * For 1D, an array of objects: {x}.
 * @param {Objects[]} voterGeoms - For 2D, an array of objects: {x,y,w}.
 * For 1D, an array of objects: {x,w,densityProfile}.
 * @returns votes, an object
 */
export default function castPlurality(geometry, castOptions) {
    const { canGeoms, voterGeoms, dimensions, parties } = geometry

    const SummerLines = (dimensions === 1)
        ? CastPluralitySummer1DIntervals
        : CastPluralitySummer2DQuadrature
    const someGaussian2D = voterGeoms.some((v) => v.densityProfile === 'gaussian') && dimensions === 2

    const Summer = (someGaussian2D) ? CastPluralitySummerGrid : SummerLines
    const summer = new Summer(canGeoms, castOptions, dimensions)

    // get fraction of votes for each candidate so we can summarize results
    const n = canGeoms.length
    const votesByGeom = []
    const countByCan = (new Array(n)).fill(0)
    let totalVotes = 0
    for (let i = 0; i < voterGeoms.length; i++) {
        const voterGeom = voterGeoms[i]

        const votesForGeom = summer.sumArea(voterGeom)
        votesByGeom[i] = votesForGeom
        const { countByCan: countByCanForGeom,
            totalVotes: totalVotesForGeom } = votesForGeom

        for (let k = 0; k < n; k++) {
            countByCan[k] += countByCanForGeom[k]
        }
        totalVotes += totalVotesForGeom
    }
    const voteFractionsByCan = countByCan.map((x) => x / totalVotes)
    const votes = { tallyFractions: voteFractionsByCan, votesByGeom, parties }
    return votes
}
