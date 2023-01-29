/** @module */

import castRankingTestVote from './castRankingTestVote.js'
import makeGrid1D from './makeGrid1D.js'
import makeGrid2D from './makeGrid2D.js'

/**
 * Sum area of voter distributions to tally the votes.
 * @param {Object[]} canGeoms - position of each candidate {x}
 * @constructor
 */
export default function CastRankingSummerGrid(canGeoms, castOptions, dimensions) {
    const self = this

    self.sumArea = function sumArea(voterGeom, wt) {
        // just find the vote at each grid point and weight according to type
        const makeGrid = (dimensions === 1) ? makeGrid1D : makeGrid2D
        const grid = makeGrid(voterGeom, castOptions)

        const nk = canGeoms.length
        const bordaTotals = Array(nk).fill(0)
        const ranking = new Array(nk)
        const cansRanked = new Array(nk)
        let totalArea = 0

        // find vote
        const gridLength = grid.x.length
        const voteSet = Array(gridLength)
        for (let i = 0; i < gridLength; i++) {
            const weight = grid.weight[i]
            const testVoter = grid.testVoter[i]
            const vote = castRankingTestVote({ canGeoms, voterGeom: testVoter, dimensions })
            voteSet[i] = vote

            // todo: possibly speed things up by combining votes with the same ranking.
            ranking[i] = vote.ranking
            cansRanked[i] = vote.indexInOrder.map((can) => [can])
            totalArea += weight

            const { tallyFractions } = vote
            for (let k = 0; k < nk; k++) {
                bordaTotals[k] += tallyFractions[k] * weight
            }
        }
        totalArea *= wt
        const area = grid.weight.map(
            (a) => wt * a,
        )

        // bordaScore is nk-1 if a candidate receives all the votes for the voter geometry.
        // tallyFractions is wt if a candidate receives all the votes.
        const tallyFractions = bordaTotals.map(
            (bt) => wt * (bt / (nk - 1)),
        )

        return {
            grid, voteSet, weightSet: grid.weight, area, totalArea, tallyFractions, ranking, cansRanked,
        }
    }
}
