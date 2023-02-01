/** @module */

import castRankingTestVote from './castRankingTestVote.js'
import makeGrid1D from './makeGrid1D.js'
import makeGrid2D from './makeGrid2D.js'

/**
 * Tally votes.
 * @param {Object[]} canGeoms - position of each candidate {x}
 * @constructor
 */
export default function CastRankingSummerGrid(canGeoms, castOptions, dimensions) {
    const self = this

    self.sumArea = function sumArea(voterGeom) {
        // just find the vote and count at each grid point
        const makeGrid = (dimensions === 1) ? makeGrid1D : makeGrid2D
        const grid = makeGrid(voterGeom, castOptions)

        const nk = canGeoms.length
        const bordaScoreSumByCan = Array(nk).fill(0)
        const ranking = new Array(nk)
        const cansRanked = new Array(nk)
        let totalArea = 0

        // find vote
        const gridLength = grid.x.length
        const voteSet = Array(gridLength)
        for (let i = 0; i < gridLength; i++) {
            const countByVote = grid.countByVote[i]
            const testVoter = grid.testVoter[i]
            const vote = castRankingTestVote({ canGeoms, voterGeom: testVoter, dimensions })
            voteSet[i] = vote

            // todo: possibly speed things up by combining votes with the same ranking.
            ranking[i] = vote.ranking
            cansRanked[i] = vote.indexInOrder.map((can) => [can])
            totalArea += countByVote

            const { bordaScores } = vote
            for (let k = 0; k < nk; k++) {
                bordaScoreSumByCan[k] += bordaScores[k] * countByVote
            }
        }

        // bordaScore is nk-1 if a candidate receives all the votes for the voter geometry.
        // bordaFractionSumByCan is the total number of votes if a candidate receives all the votes.
        const bordaFractionSumByCan = bordaScoreSumByCan.map(
            (bt) => (bt / (nk - 1)),
        )

        return {
            grid, voteSet, area: grid.countByVote, totalArea, tallyFractions: bordaFractionSumByCan, ranking, cansRanked,
        }
    }
}
