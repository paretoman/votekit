/** @module */

import castScoreTestVote from './castScoreTestVote.js'
import makeGrid1D from '../voteCasters/makeGrid1D.js'
import makeGrid2D from '../voteCasters/makeGrid2D.js'

/**
 * Tally votes.
 */
export default function castScoreGrid(voterGeom, geometry, castOptions) {
    const { canGeoms, dimensions } = geometry
    // just find the vote and count at each grid point
    const makeGrid = (dimensions === 1) ? makeGrid1D : makeGrid2D
    const grid = makeGrid(voterGeom, castOptions)

    const n = canGeoms.length
    const canPoints = (dimensions === 1)
        ? canGeoms.map((c) => c.x)
        : canGeoms.map((c) => [c.x, c.y])
    const scoreSumByCan = Array(n).fill(0)
    let totalVotes = 0

    // find vote
    const gridLength = grid.x.length
    const voteSet = Array(gridLength)
    for (let i = 0; i < gridLength; i++) {
        const voteCount = grid.voteCounts[i]
        const voterPoint = grid.voterPoints[i]
        const vote = castScoreTestVote({ canPoints, voterPoint, dimensions })
        voteSet[i] = vote
        const { scoreVote } = vote
        totalVotes += voteCount
        for (let k = 0; k < n; k++) {
            scoreSumByCan[k] += scoreVote[k] * voteCount
        }
    }
    const votesForGeom = { grid, voteSet, scoreSumByCan, totalVotes, voterGeom }
    return votesForGeom
}
