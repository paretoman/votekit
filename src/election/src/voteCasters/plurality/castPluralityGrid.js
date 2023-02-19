/** @module */

import castPluralityTestVote from './castPluralityTestVote.js'
import makeGrid1D from '../voteCasters/makeGrid1D.js'
import makeGrid2D from '../voteCasters/makeGrid2D.js'
import * as typesVotesForGeomGrid from '../types/typesVotesForGeomGrid.js'

/**
 * Tally votes.
 * @returns {typesVotesForGeomGrid.votesForGeomGridPlurality}
 */
export default function castPluralityGrid(voterGeom, geometry, castOptions) {
    const { canGeoms, dimensions } = geometry

    // just find the vote and count at each grid point
    const makeGrid = (dimensions === 1) ? makeGrid1D : makeGrid2D
    const grid = makeGrid(voterGeom, castOptions)

    const n = canGeoms.length
    const canPoints = (dimensions === 1)
        ? canGeoms.map((c) => c.x)
        : canGeoms.map((c) => [c.x, c.y])
    const countByCan = Array(n).fill(0)
    let totalVotes = 0

    // find vote
    const gridLength = grid.x.length
    const voteSet = Array(gridLength)
    for (let i = 0; i < gridLength; i++) {
        const voteCounts = grid.voteCounts[i]
        const voterPoint = grid.voterPoints[i]
        const vote = castPluralityTestVote({ canPoints, voterPoint, dimensions })
        voteSet[i] = vote
        const { pluralityVote } = vote
        countByCan[pluralityVote] += voteCounts
        totalVotes += voteCounts
    }
    return {
        grid, voteSet, countByCan, totalVotes,
    }
}
