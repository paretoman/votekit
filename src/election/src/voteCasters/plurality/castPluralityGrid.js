/** @module */

import castPluralityPoint from './castPluralityPoint.js'
import makeGrid1D from '../voteCasters/makeGrid1D.js'
import makeGrid2D from '../voteCasters/makeGrid2D.js'
import * as typesVotesForGeomGrid from '../types/typesVotesForGeomGrid.js'

/**
 * Tally votes.
 * @returns {typesVotesForGeomGrid.votesForGeomGridPlurality}
 */
export default function castPluralityGrid(voterGeom, geometry, castOptions, strategyRngs, voterStrategy) {
    const { canPoints, dimensions, information } = geometry
    const { verbosity } = castOptions

    // just find the vote and count at each grid point
    const makeGrid = (dimensions === 1) ? makeGrid1D : makeGrid2D
    const grid = makeGrid(voterGeom, castOptions)

    const n = canPoints.length
    const countByCan = Array(n).fill(0)
    let totalVotes = 0

    // find vote
    const gridLength = grid.x.length
    const voteSet = Array(gridLength)
    for (let i = 0; i < gridLength; i++) {
        const voteCounts = grid.voteCounts[i]
        const voterPoint = grid.voterPoints[i]
        const vote = castPluralityPoint(canPoints, voterPoint, dimensions, verbosity, information, voterStrategy, strategyRngs)
        const { pluralityVote } = vote
        countByCan[pluralityVote] += voteCounts
        totalVotes += voteCounts

        if (verbosity < 2) continue

        voteSet[i] = vote
    }
    if (verbosity < 2) {
        return { countByCan, totalVotes }
    }
    return {
        grid, voteSet, countByCan, totalVotes,
    }
}
