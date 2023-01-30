/** @module */

import { range } from '../../utilities/jsHelpers.js'
import castRankingTestVote from './castRankingTestVote.js'
import makeGrid1D from './makeGrid1D.js'
import makeGrid2D from './makeGrid2D.js'

/**
 * Sum area of voter distributions to tally the votes.
 * @param {Object[]} canGeoms - position of each candidate {x}
 * @constructor
 */
export default function CastPairwiseSummerGrid(canGeoms, castOptions, dimensions) {
    const self = this

    self.sumArea = function sumArea(voterGeom, wt) {
        // just find the vote at each grid point and weight according to type
        const makeGrid = (dimensions === 1) ? makeGrid1D : makeGrid2D
        const grid = makeGrid(voterGeom, castOptions)

        const nk = canGeoms.length
        const bordaTotals = Array(nk).fill(0)
        const netWins = new Array(nk)
        range(nk).forEach((_, i) => { netWins[i] = Array(nk).fill(0) })
        let totalArea = 0

        // find vote
        const gridLength = grid.x.length
        const voteSet = Array(gridLength)
        for (let i = 0; i < gridLength; i++) {
            const weight = grid.weight[i]
            const testVoter = grid.testVoter[i]
            const vote = castRankingTestVote({ canGeoms, voterGeom: testVoter, dimensions })
            voteSet[i] = vote

            const { pairwise } = vote
            for (let m = 0; m < nk - 1; m++) {
                for (let k = m + 1; k < nk; k++) {
                    netWins[m][k] += pairwise[m][k] * weight
                }
            }

            const { tallyFractions } = vote
            totalArea += weight
            for (let k = 0; k < nk; k++) {
                bordaTotals[k] += tallyFractions[k] * weight
            }
        }
        totalArea *= wt

        // netWins is nk-1 if a candidate receives all the votes for the voter geometry.
        // area is wt
        const area = netWins.map((row) => row.map(
            (net) => wt * ((net / (nk - 1)) + 1) * 0.5,
        ))
        // tallyFractions is wt if a candidate receives all the votes.
        const tallyFractions = bordaTotals.map(
            (bt) => wt * (bt / (nk - 1)),
        )

        return {
            grid, voteSet, area, totalArea, tallyFractions,
        }
    }
}
