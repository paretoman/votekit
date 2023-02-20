/** @module */

import castRankingTestVote from './castRankingTestVote.js'
import makeGrid1D from '../voteCasters/makeGrid1D.js'
import makeGrid2D from '../voteCasters/makeGrid2D.js'

import * as typesGeoms from '../types/typesGeoms.js'
import * as typesGeometry from '../types/typesGeometry.js'
import * as typesCast from '../types/typesCast.js'
import * as typesVotesForGeomGrid from '../types/typesVotesForGeomGrid.js'

/**
 * Cast and tally votes on a grid of points.
 * @param {typesGeoms.voterGeom} voterGeom
 * @param {typesGeometry.geometry} geometry
 * @param {typesCast.castOptions} castOptions
 * @returns {typesVotesForGeomGrid.votesForGeomGridRanking} votesForGeom
 */
export default function castRankingGrid(voterGeom, geometry, castOptions) {
    const { canPoints, dimensions } = geometry
    const { verbosity } = castOptions

    // just find the vote and voteCount at each grid point
    const makeGrid = (dimensions === 1) ? makeGrid1D : makeGrid2D
    // @ts-ignore
    const grid = makeGrid(voterGeom, castOptions)

    const nk = canPoints.length
    const cansByRankList = new Array(nk)

    let bordaScoreSumByCan
    let rankings
    if (verbosity >= 2) {
        bordaScoreSumByCan = Array(nk).fill(0)
        rankings = new Array(nk)
    }

    // find vote
    const { voteCounts, totalVotes } = grid
    const voteSet = Array(voteCounts.length)
    for (let i = 0; i < voteCounts.length; i++) {
        const voteCount = voteCounts[i]

        const voterPoint = grid.voterPoints[i]
        const vote = castRankingTestVote(canPoints, voterPoint, dimensions, verbosity)

        const len = vote.indexInOrder.length
        const cansByRank = Array(len)
        for (let m = 0; m < len; m++) {
            const can = vote.indexInOrder[m]
            cansByRank[m] = [can]
        }
        cansByRankList[i] = cansByRank

        if (verbosity < 2) continue

        voteSet[i] = vote

        rankings[i] = vote.ranking
        const { bordaScores } = vote
        for (let k = 0; k < nk; k++) {
            bordaScoreSumByCan[k] += bordaScores[k] * voteCount
        }
    }
    if (verbosity < 2) {
        return { voteCounts, totalVotes, cansByRankList }
    }

    // bordaScore is nk-1 if a candidate receives all the votes for the voter geometry.
    // bordaFractionAverageByCan is 1 if a candidate receives all the votes.
    const bordaFractionAverageByCan = bordaScoreSumByCan.map(
        (bt) => (bt / (nk - 1)) / totalVotes,
    )
    return { grid, voteSet, voteCounts, totalVotes, bordaFractionAverageByCan, rankings, cansByRankList }
}
