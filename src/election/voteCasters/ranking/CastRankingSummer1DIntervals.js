/** @module */

import { sumBlock, sumGaussian } from '../plurality/castPluralityIntervals1D.js'
import castRankingFindIntervals from './castRankingFindIntervals.js'
/**
 * Sum density of voter distributions within intervals to tally the votes.
 * @param {Object[]} canGeoms
 * @constructor
 */
export default function CastRankingSummer1DIntervals(canGeoms) {
    const self = this

    const { intervalBorders, rankings, cansByRankList } = castRankingFindIntervals(canGeoms)

    self.sumArea = function sumArea(voterGeom) {
        // find count inside each interval

        const ni = intervalBorders.length - 1
        const voteCounts = Array(ni)
        let totalVotes = 0
        for (let i = 0; i < ni; i++) {
            // return count for each ranking
            const lower = intervalBorders[i]
            const upper = intervalBorders[i + 1]
            const voteCount = sumInterval(lower, upper, voterGeom)
            voteCounts[i] = voteCount
            totalVotes += voteCount
        }
        return {
            rankings, cansByRankList, voteCounts, totalVotes, intervalBorders,
        }
    }
}

function sumInterval(lower, upper, voterGeom) {
    if (voterGeom.densityProfile === 'gaussian') {
        return sumGaussian(voterGeom, { lower, upper })
    }
    return sumBlock(voterGeom, { lower, upper })
}
