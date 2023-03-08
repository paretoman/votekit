/** @module */

import castScorePoint from './castScorePoint.js'
import makeGrid1D from '../voteCasters/makeGrid1D.js'
import makeGrid2D from '../voteCasters/makeGrid2D.js'

/**
 * Tally votes.
 */
export default function castScoreGrid(voterGeom, geometry, castOptions, strategyRng, voterGroupBehavior) {
    const { canPoints, dimensions, information } = geometry
    const { verbosity } = castOptions

    // just find the vote and count at each grid point
    const makeGrid = (dimensions === 1) ? makeGrid1D : makeGrid2D
    const grid = makeGrid(voterGeom, castOptions)
    const { voteCounts, totalVotes, voterPoints } = grid

    const n = canPoints.length
    const scoreSumByCan = Array(n).fill(0)

    // find vote
    const gridLength = grid.x.length
    const voteSet = Array(gridLength)
    for (let i = 0; i < gridLength; i++) {
        const voteCount = voteCounts[i]
        const voterPoint = voterPoints[i]

        const vote = castScorePoint(canPoints, voterPoint, dimensions, information, voterGroupBehavior, strategyRng)
        voteSet[i] = vote
        const { scoreVote } = vote
        for (let k = 0; k < n; k++) {
            scoreSumByCan[k] += scoreVote[k] * voteCount
        }
    }
    if (verbosity < 2) {
        return { scoreSumByCan, totalVotes }
    }
    const votesForGeom = { grid, voteSet, scoreSumByCan, totalVotes, voterGeom }
    return votesForGeom
}
