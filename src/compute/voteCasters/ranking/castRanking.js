/** @module */

import * as types from '@paretoman/votekit-types'
import castRankingGrid from './castRankingGrid.js'
import castRankingIntervals1D from './castRankingIntervals1D.js'
import castRankingPolygons2D from './castRankingPolygons2D.js'

/**
 * Voters cast votes for candidates.
 * @param {types.typesGeometry.geometry} geometry - geometry for casting votes
 * @param {types.typesCast.castOptions} castOptions - options for how to cast votes.
 * @returns {types.typesVotes.votes} votes
 */

export default function castRanking(geometry, castOptions) {
    const { canPoints, voterGeoms, dimensions, parties } = geometry
    const { verbosity } = castOptions

    const someGaussian2D = voterGeoms.some((v) => v.densityProfile === 'gaussian') && dimensions === 2

    const castRegions = (dimensions === 1)
        ? castRankingIntervals1D
        : castRankingPolygons2D
    const cast = (someGaussian2D) ? castRankingGrid : castRegions

    const n = canPoints.length

    // get fraction of votes for each candidate so we can summarize results
    const voteCounts = []
    const rankings = []
    const cansByRankList = []
    const firstPreferences = Array(n).fill(0)
    let totalVotes = 0
    const votesByGeom = []

    // should ideally make a set of polygons for each ranking so that we avoid repeating rankings.
    voterGeoms.forEach((voterGeom, g) => {
        const votesForGeom = cast(voterGeom, geometry, castOptions)

        const { rankings: rankingsForGeom,
            cansByRankList: cansByRankListForGeom,
            voteCounts: voteCountsForGeom,
            totalVotes: totalVotesForGeom } = votesForGeom

        // concat
        const n1 = voteCounts.length
        const n2 = voteCountsForGeom.length
        voteCounts.length += n2
        for (let i = 0; i < n2; i++) {
            voteCounts[n1 + i] = voteCountsForGeom[i]
            cansByRankList[n1 + i] = cansByRankListForGeom[i]
        }
        totalVotes += totalVotesForGeom

        // tally first preferences
        for (let i = 0; i < cansByRankListForGeom.length; i++) {
            const cr0 = cansByRankListForGeom[i][0]
            for (let k = 0; k < cr0.length; k++) {
                const c0 = cr0[k]
                firstPreferences[c0] += voteCountsForGeom[i]
            }
        }

        if (verbosity < 2) return

        for (let i = 0; i < n2; i++) {
            rankings[n1 + i] = rankingsForGeom[i]
        }

        votesByGeom[g] = votesForGeom
    })
    const voteFractions = voteCounts.map((x) => x / totalVotes)
    const firstPreferenceFractions = firstPreferences.map((x) => x / totalVotes)

    const preferenceLists = { cansByRankList }
    const preferenceTallies = { voteFractions }
    const candidateTallies = { firstPreferenceFractions }
    const numCans = canPoints.length
    const votes = { preferenceLists, preferenceTallies, candidateTallies, parties, numCans }
    if (verbosity < 2) return votes

    preferenceLists.rankings = rankings
    votes.votesByGeom = votesByGeom
    return votes
}
