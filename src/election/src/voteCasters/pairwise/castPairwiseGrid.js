/** @module */

import makeGrid1D from '../voteCasters/makeGrid1D.js'
import makeGrid2D from '../voteCasters/makeGrid2D.js'
import castPairwisePoint from './castPairwisePoint.js'

/**
 * Tally votes.
 */
export default function castPairwiseGrid(voterGeom, geometry, castOptions) {
    const { canPoints, dimensions } = geometry
    const { verbosity } = castOptions

    // just find the vote and count at each grid point
    const makeGrid = (dimensions === 1) ? makeGrid1D : makeGrid2D
    const grid = makeGrid(voterGeom, castOptions)
    const { voteCounts, totalVotes, voterPoints } = grid
    const gridLength = voteCounts.length

    const nk = canPoints.length
    const netWins = new Array(nk)
    for (let i = 0; i < nk; i++) {
        netWins[i] = Array(nk).fill(0)
    }

    let bordaScoreSumByCan
    let voteSet
    if (verbosity >= 2) {
        bordaScoreSumByCan = Array(nk).fill(0)
        voteSet = Array(gridLength)
    }

    // find vote
    for (let i = 0; i < gridLength; i++) {
        const voteCount = voteCounts[i]
        const voterPoint = voterPoints[i]
        const vote = castPairwisePoint(canPoints, voterPoint, dimensions)

        const { netWinsPairwise } = vote
        for (let m = 0; m < nk - 1; m++) {
            for (let k = m + 1; k < nk; k++) {
                netWins[m][k] += netWinsPairwise[m][k] * voteCount
            }
        }

        if (verbosity < 2) continue

        voteSet[i] = vote

        const { bordaScores } = vote
        for (let k = 0; k < nk; k++) {
            bordaScoreSumByCan[k] += bordaScores[k] * voteCount
        }
    }

    // netWins is totalVotes if a candidate receives all the votes for the voter geometry.
    // winsPairwise is the total number of votes, too
    const winsPairwise = netWins.map((row) => row.map(
        (net) => (net + totalVotes) * 0.5,
    ))

    if (verbosity < 2) {
        return { voteCounts, totalVotes, winsPairwise }
    }

    // bordaScore is nk-1 if a candidate receives all the votes for the voter geometry.
    // bordaFractionAverageByCan is 1 if a candidate receives all the votes.
    const bordaFractionAverageByCan = bordaScoreSumByCan.map(
        (bt) => (bt / (nk - 1)) / totalVotes,
    )

    return {
        grid, voteSet, winsPairwise, totalVotes, bordaFractionAverageByCan,
    }
}
