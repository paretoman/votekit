/** @module */

import { sumBlock, sumGaussian } from './CastPluralitySummer1DIntervals.js'
import castRankingFindIntervals from './castRankingFindIntervals.js'
/**
 * Sum density of voter distributions within intervals to tally the votes.
 * @param {Object[]} canGeoms
 * @constructor
 */
export default function CastRankingSummer1DIntervals(canGeoms) {
    const self = this

    const { intervalBorders, ranking, cansRanked } = castRankingFindIntervals(canGeoms)

    self.sumArea = function sumArea(voterGeom) {
        // find count inside each interval

        const ni = intervalBorders.length - 1
        const voteCounts = Array(ni)
        let totalCount = 0
        for (let i = 0; i < ni; i++) {
            // return count for each ranking
            const lower = intervalBorders[i]
            const upper = intervalBorders[i + 1]
            const voteCount = sumInterval(lower, upper, voterGeom)
            voteCounts[i] = voteCount
            totalCount += voteCount
        }
        return {
            ranking, cansRanked, voteCounts, totalCount, intervalBorders,
        }
    }
}

function sumInterval(lower, upper, voterGeom) {
    if (voterGeom.densityProfile === 'gaussian') {
        return sumGaussian(voterGeom, { lower, upper })
    }
    return sumBlock(voterGeom, { lower, upper })
}
