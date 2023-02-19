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
    const { canGeoms, dimensions } = geometry

    // just find the vote and voteCount at each grid point
    const makeGrid = (dimensions === 1) ? makeGrid1D : makeGrid2D
    // @ts-ignore
    const grid = makeGrid(voterGeom, castOptions)

    const nk = canGeoms.length
    const canPoints = (dimensions === 1)
        ? canGeoms.map((c) => c.x)
        : canGeoms.map((c) => [c.x, c.y])
    const bordaScoreSumByCan = Array(nk).fill(0)
    const rankings = new Array(nk)
    const cansByRankList = new Array(nk)
    let totalVotes = 0

    // find vote
    const { voteCounts } = grid
    const voteSet = Array(voteCounts.length)
    for (let i = 0; i < voteCounts.length; i++) {
        const voteCount = voteCounts[i]

        const voterPoint = grid.voterPoints[i]
        const vote = castRankingTestVote({ canPoints, voterPoint, dimensions })
        voteSet[i] = vote

        // todo: possibly speed things up by combining votes with the same ranking.
        rankings[i] = vote.ranking
        cansByRankList[i] = vote.indexInOrder.map((can) => [can])
        totalVotes += voteCount

        const { bordaScores } = vote
        for (let k = 0; k < nk; k++) {
            bordaScoreSumByCan[k] += bordaScores[k] * voteCount
        }
    }

    // bordaScore is nk-1 if a candidate receives all the votes for the voter geometry.
    // bordaFractionAverageByCan is 1 if a candidate receives all the votes.
    const bordaFractionAverageByCan = bordaScoreSumByCan.map(
        (bt) => (bt / (nk - 1)) / totalVotes,
    )

    return {
        grid, voteSet, voteCounts, totalVotes, bordaFractionAverageByCan, rankings, cansByRankList,
    }
}
