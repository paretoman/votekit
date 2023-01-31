/** @module */

import castScoreTestVote from './castScoreTestVote.js'
import makeGrid1D from './makeGrid1D.js'
import makeGrid2D from './makeGrid2D.js'

/**
 * Sum area of voter distributions to tally the votes.
 * @param {Object[]} canGeoms
 * @constructor
 */
export default function CastScoreSummerGrid(canGeoms, castOptions, dimensions) {
    const self = this

    self.sumArea = function sumArea(voterGeom) {
        // just find the vote at each grid point and weight according to type
        const makeGrid = (dimensions === 1) ? makeGrid1D : makeGrid2D
        const grid = makeGrid(voterGeom, castOptions)

        const n = canGeoms.length
        const countByCanForGeom = Array(n).fill(0)
        let totalCountForGeom = 0

        // find vote
        const gridLength = grid.x.length
        const voteSet = Array(gridLength)
        for (let i = 0; i < gridLength; i++) {
            const voteCount = grid.voteCount[i]
            // if (weight === 0) continue
            const testVoter = grid.testVoter[i]
            const vote = castScoreTestVote({ canGeoms, voterGeom: testVoter, dimensions })
            voteSet[i] = vote
            const { tallyFractions } = vote
            totalCountForGeom += voteCount
            for (let k = 0; k < n; k++) {
                countByCanForGeom[k] += tallyFractions[k] * voteCount
            }
        }
        return {
            grid, voteSet, countByCanForGeom, totalCountForGeom,
        }
    }
}
