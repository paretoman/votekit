/** @module */

import castScoreTestVote from './castScoreTestVote.js'
import makeGrid2D from './makeGrid2D.js'

/**
 * Sum area of voter distributions to tally the votes.
 * @param {Object[]} canGeoms
 * @constructor
 */
export default function CastScoreSummer2DGrid(canGeoms, castOptions) {
    const self = this

    self.sumArea = function sumArea(voterGeom) {
        // just find the vote at each grid point and weight according to type
        const grid = makeGrid2D(voterGeom, castOptions)

        const n = canGeoms.length
        const area = Array(n).fill(0)
        let totalArea = 0

        // find vote
        const gridLength = grid.x.length
        const voteSet = Array(gridLength)
        for (let i = 0; i < gridLength; i++) {
            const weight = grid.weight[i]
            // if (weight === 0) continue
            const x = grid.x[i]
            const y = grid.y[i]
            const testVoter = { x, y }
            const vote = castScoreTestVote({ canGeoms, voterGeom: testVoter, dimensions: 2 })
            voteSet[i] = vote
            const { tallyFractions } = vote
            totalArea += weight
            for (let k = 0; k < n; k++) {
                area[k] += tallyFractions[k] * weight
            }
        }
        return {
            grid, voteSet, area, totalArea, weightSet: grid.weight,
        }
    }
}
