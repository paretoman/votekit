/** @module */

import castPluralityTestVote from './castPluralityTestVote.js'
import makeGrid1D from '../voteCasters/makeGrid1D.js'
import makeGrid2D from '../voteCasters/makeGrid2D.js'

/**
 * Tally votes.
 * @param {Object[]} canGeoms - position of each candidate {x}
 * @constructor
 */
export default function CastPluralitySummerGrid(canGeoms, castOptions, dimensions) {
    const self = this

    self.sumArea = function sumArea(voterGeom) {
        // just find the vote and count at each grid point
        const makeGrid = (dimensions === 1) ? makeGrid1D : makeGrid2D
        const grid = makeGrid(voterGeom, castOptions)

        const n = canGeoms.length
        const countByCan = Array(n).fill(0)
        let totalVotes = 0

        // find vote
        const gridLength = grid.x.length
        const voteSet = Array(gridLength)
        for (let i = 0; i < gridLength; i++) {
            const voteCounts = grid.voteCounts[i]
            const testVoter = grid.testVoter[i]
            const vote = castPluralityTestVote({ canGeoms, voterGeom: testVoter, dimensions })
            voteSet[i] = vote
            const { pluralityVote } = vote
            countByCan[pluralityVote] += voteCounts
            totalVotes += voteCounts
        }
        return {
            grid, voteSet, countByCan, totalVotes,
        }
    }
}
