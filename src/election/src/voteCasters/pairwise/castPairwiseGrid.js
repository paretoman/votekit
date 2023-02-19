/** @module */

import { range } from '../../election/mathHelpers.js'
import castRankingTestVote from '../ranking/castRankingTestVote.js'
import makeGrid1D from '../voteCasters/makeGrid1D.js'
import makeGrid2D from '../voteCasters/makeGrid2D.js'

/**
 * Tally votes.
 */
export default function castPairwiseGrid(voterGeom, geometry, castOptions) {
    const { canGeoms, dimensions } = geometry

    // just find the vote and count at each grid point
    const makeGrid = (dimensions === 1) ? makeGrid1D : makeGrid2D
    const grid = makeGrid(voterGeom, castOptions)

    const nk = canGeoms.length
    const canPoints = (dimensions === 1)
        ? canGeoms.map((c) => c.x)
        : canGeoms.map((c) => [c.x, c.y])
    const bordaScoreSumByCan = Array(nk).fill(0)
    const netWins = new Array(nk)
    range(nk).forEach((_, i) => { netWins[i] = Array(nk).fill(0) })
    let totalVotes = 0

    // find vote
    const gridLength = grid.x.length
    const voteSet = Array(gridLength)
    for (let i = 0; i < gridLength; i++) {
        const voteCount = grid.voteCounts[i]
        const voterPoint = grid.voterPoints[i]
        const vote = castRankingTestVote(canPoints, voterPoint, dimensions)
        voteSet[i] = vote

        const { netWinsPairwise } = vote
        for (let m = 0; m < nk - 1; m++) {
            for (let k = m + 1; k < nk; k++) {
                netWins[m][k] += netWinsPairwise[m][k] * voteCount
            }
        }

        const { bordaScores } = vote
        totalVotes += voteCount
        for (let k = 0; k < nk; k++) {
            bordaScoreSumByCan[k] += bordaScores[k] * voteCount
        }
    }

    // netWins is totalVotes if a candidate receives all the votes for the voter geometry.
    // winsPairwise is the total number of votes, too
    const winsPairwise = netWins.map((row) => row.map(
        (net) => (net + totalVotes) * 0.5,
    ))
    // bordaScore is nk-1 if a candidate receives all the votes for the voter geometry.
    // bordaFractionAverageByCan is 1 if a candidate receives all the votes.
    const bordaFractionAverageByCan = bordaScoreSumByCan.map(
        (bt) => (bt / (nk - 1)) / totalVotes,
    )

    return {
        grid, voteSet, winsPairwise, totalVotes, bordaFractionAverageByCan,
    }
}
