/** @module */

import castScoreTestVote from './castScoreTestVote.js'
import makeGrid1D from './makeGrid1D.js'
import makeGrid2D from './makeGrid2D.js'

/**
 * Tally votes.
 * @param {Object[]} canGeoms
 * @constructor
 */
export default function CastScoreSummerGrid(canGeoms, castOptions, dimensions) {
    const self = this

    self.sumArea = function sumArea(voterGeom) {
        // just find the vote and count at each grid point
        const makeGrid = (dimensions === 1) ? makeGrid1D : makeGrid2D
        const grid = makeGrid(voterGeom, castOptions)

        const n = canGeoms.length
        const scoreSumByCan = Array(n).fill(0)
        let totalCount = 0

        // find vote
        const gridLength = grid.x.length
        const voteSet = Array(gridLength)
        for (let i = 0; i < gridLength; i++) {
            const voteCount = grid.voteCounts[i]
            const testVoter = grid.testVoter[i]
            const vote = castScoreTestVote({ canGeoms, voterGeom: testVoter, dimensions })
            voteSet[i] = vote
            const { scoreVote } = vote
            totalCount += voteCount
            for (let k = 0; k < n; k++) {
                scoreSumByCan[k] += scoreVote[k] * voteCount
            }
        }
        const votesForGeom = { grid, voteSet, scoreSumByCan, totalCount, voterGeom }
        return votesForGeom
    }
}
