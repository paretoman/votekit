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
        // just find the vote and voteCount at each grid point
        const makeGrid = (dimensions === 1) ? makeGrid1D : makeGrid2D
        const grid = makeGrid(voterGeom, castOptions)

        const nk = canGeoms.length
        const bordaScoreSumByCan = Array(nk).fill(0)
        const ranking = new Array(nk)
        const cansByRankList = new Array(nk)
        let totalVotes = 0

        // find vote
        const { voteCounts } = grid
        const voteSet = Array(voteCounts.length)
        for (let i = 0; i < voteCounts.length; i++) {
            const voteCount = voteCounts[i]

            const testVoter = grid.testVoter[i]
            const vote = castRankingTestVote({ canGeoms, voterGeom: testVoter, dimensions })
            voteSet[i] = vote

            // todo: possibly speed things up by combining votes with the same ranking.
            ranking[i] = vote.ranking
            cansByRankList[i] = vote.indexInOrder.map((can) => [can])
            totalVotes += voteCount

            const { bordaScores } = vote
            for (let k = 0; k < nk; k++) {
                bordaScoreSumByCan[k] += bordaScores[k] * voteCount
            }
        }

        // bordaScore is nk-1 if a candidate receives all the votes for the voter geometry.
        // bordaFractionAverageByCan is 1 if a candidate receives all the votes.
        const bordaFractionAverageByCan = bordaScoreSumByCan.map(
            (bt) => (bt / (nk - 1)) / totalVotes,
        )

        return {
            grid, voteSet, voteCounts, totalVotes, tallyFractions: bordaFractionAverageByCan, ranking, cansByRankList,
        }
    }
}
