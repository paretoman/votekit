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
        const area = Array(n).fill(0)
        let totalArea = 0
        const countByCanForGeom = Array(n).fill(0)
        let totalCountForGeom = 0

        // find vote
        const gridLength = grid.x.length
        const voteSet = Array(gridLength)
        for (let i = 0; i < gridLength; i++) {
            const weight = grid.weight[i]
            const count = grid.count[i]
            // if (weight === 0) continue
            const testVoter = grid.testVoter[i]
            const vote = castScoreTestVote({ canGeoms, voterGeom: testVoter, dimensions })
            voteSet[i] = vote
            const { tallyFractions } = vote
            totalArea += weight
            totalCountForGeom += count
            for (let k = 0; k < n; k++) {
                area[k] += tallyFractions[k] * weight
                countByCanForGeom[k] += tallyFractions[k] * count
            }
        }
        return {
            grid, voteSet, area, totalArea, countByCanForGeom, totalCountForGeom,
        }
    }
}
