/** @module */

import { range } from '../../utilities/jsHelpers.js'
import castRankingTestVote from './castRankingTestVote.js'
import makeGrid1D from './makeGrid1D.js'
import makeGrid2D from './makeGrid2D.js'

/**
 * Tally votes.
 * @param {Object[]} canGeoms - position of each candidate {x}
 * @constructor
 */
export default function CastPairwiseSummerGrid(canGeoms, castOptions, dimensions) {
    const self = this

    self.sumArea = function sumArea(voterGeom) {
        // just find the vote and count at each grid point
        const makeGrid = (dimensions === 1) ? makeGrid1D : makeGrid2D
        const grid = makeGrid(voterGeom, castOptions)

        const nk = canGeoms.length
        const bordaScoreSumByCan = Array(nk).fill(0)
        const netWins = new Array(nk)
        range(nk).forEach((_, i) => { netWins[i] = Array(nk).fill(0) })
        let totalArea = 0

        // find vote
        const gridLength = grid.x.length
        const voteSet = Array(gridLength)
        for (let i = 0; i < gridLength; i++) {
            const countByVote = grid.countByVote[i]
            const testVoter = grid.testVoter[i]
            const vote = castRankingTestVote({ canGeoms, voterGeom: testVoter, dimensions })
            voteSet[i] = vote

            const { netWinsPairwise } = vote
            for (let m = 0; m < nk - 1; m++) {
                for (let k = m + 1; k < nk; k++) {
                    netWins[m][k] += netWinsPairwise[m][k] * countByVote
                }
            }

            const { bordaScores } = vote
            totalArea += countByVote
            for (let k = 0; k < nk; k++) {
                bordaScoreSumByCan[k] += bordaScores[k] * countByVote
            }
        }

        // netWins is (nk-1)*totalVotes if a candidate receives all the votes for the voter geometry.
        // winFractionSumPairwise is the total number of votes
        const winFractionSumPairwise = netWins.map((row) => row.map(
            (net) => ((net / (nk - 1)) + 1) * 0.5,
        ))
        // bordaScore is nk-1 if a candidate receives all the votes for the voter geometry.
        // bordaFractionSumByCan is the total number of votes if a candidate receives all the votes.
        const bordaFractionSumByCan = bordaScoreSumByCan.map(
            (bt) => (bt / (nk - 1)),
        )

        return {
            grid, voteSet, area: winFractionSumPairwise, totalArea, tallyFractions: bordaFractionSumByCan,
        }
    }
}
