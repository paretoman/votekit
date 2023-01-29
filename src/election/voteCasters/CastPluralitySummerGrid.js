/** @module */

import castPluralityTestVote from './castPluralityTestVote.js'
import makeGrid1D from './makeGrid1D.js'
import makeGrid2D from './makeGrid2D.js'

/**
 * Sum area of voter distributions to tally the votes.
 * @param {Object[]} canGeoms - position of each candidate {x}
 * @constructor
 */
export default function CastPluralitySummerGrid(canGeoms, castOptions, dimensions) {
    const self = this

    self.sumArea = function sumArea(voterGeom) {
        // just find the vote at each grid point and weight according to type
        const makeGrid = (dimensions === 1) ? makeGrid1D : makeGrid2D
        const grid = makeGrid(voterGeom, castOptions)

        const n = canGeoms.length
        const area = Array(n).fill(0)
        let totalArea = 0

        // find vote
        const gridLength = grid.x.length
        const voteSet = Array(gridLength)
        for (let i = 0; i < gridLength; i++) {
            const weight = grid.weight[i]
            const testVoter = grid.testVoter[i]
            const vote = castPluralityTestVote({ canGeoms, voterGeom: testVoter, dimensions })
            voteSet[i] = vote
            const { tallyFractions } = vote
            totalArea += weight
            for (let k = 0; k < n; k++) {
                area[k] += tallyFractions[k] * weight
            }
        }
        return {
            grid, voteSet, weightSet: grid.weight, area, totalArea,
        }
    }
}
