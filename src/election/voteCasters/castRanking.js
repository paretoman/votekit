/** @module */

import CastRankingSummer2DPolygons from './CastRankingSummer2DPolygons.js'
import CastRankingSummer1DIntervals from './CastRankingSummer1DIntervals.js'
import CastRankingSummerGrid from './CastRankingSummerGrid.js'

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
export default function castRanking(geometry, castOptions) {
    const { canGeoms, voterGeoms, dimensions, parties } = geometry

    const SummerLines = (dimensions === 1)
        ? CastRankingSummer1DIntervals
        : CastRankingSummer2DPolygons
    const someGaussian2D = voterGeoms.some((v) => v.densityProfile === 'gaussian') && dimensions === 2
    const Summer = (someGaussian2D) ? CastRankingSummerGrid : SummerLines
    const summer = new Summer(canGeoms, castOptions, dimensions)

    const n = canGeoms.length

    // get fraction of votes for each candidate so we can summarize results
    let voteCounts = []
    let rankings = []
    let cansByRankList = []
    const firstPreferences = Array(n).fill(0)
    let totalVotes = 0
    const votesByGeom = []

    // should ideally make a set of polygons for each ranking so that we avoid repeating rankings.
    voterGeoms.forEach((voterGeom, g) => {
        const votesForGeom = summer.sumArea(voterGeom)
        votesByGeom[g] = votesForGeom
        const { rankings: rankingsForGeom,
            cansByRankList: cansByRankListForGeom,
            voteCounts: voteCountsForGeom,
            totalVotes: totalVotesForGeom } = votesForGeom

        voteCounts = voteCounts.concat(voteCountsForGeom)
        rankings = rankings.concat(rankingsForGeom)
        cansByRankList = cansByRankList.concat(cansByRankListForGeom)
        totalVotes += totalVotesForGeom

        // tally first preferences
        for (let i = 0; i < cansByRankListForGeom.length; i++) {
            const cr0 = cansByRankListForGeom[i][0]
            for (let k = 0; k < cr0.length; k++) {
                const c0 = cr0[k]
                firstPreferences[c0] += voteCountsForGeom[i]
            }
        }
    })
    const voteFractions = voteCounts.map((x) => x / totalVotes)
    const tallyFractions = firstPreferences.map((x) => x / totalVotes)

    const votes = { rankings, cansByRankList, voteFractions, tallyFractions, parties, votesByGeom }
    return votes
}
