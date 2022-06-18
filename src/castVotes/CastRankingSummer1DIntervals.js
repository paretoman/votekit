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

    self.sumArea = function sumArea(voterGeom, weight) {
        // find area inside each interval

        const ni = intervalBorders.length - 1
        const area = Array(ni)
        let totalArea = 0
        for (let i = 0; i < ni; i++) {
            // return area for each ranking
            const lower = intervalBorders[i]
            const upper = intervalBorders[i + 1]
            const theArea = sumInterval(lower, upper, voterGeom) * weight
            area[i] = theArea
            totalArea += theArea
        }
        return {
            ranking, cansRanked, area, totalArea, cellDatum: { ranking, intervalBorders },
        }
    }
}

function sumInterval(lower, upper, voterGeom) {
    if (voterGeom.densityProfile === 'gaussian') {
        return sumGaussian(voterGeom, { lower, upper })
    }
    return sumBlock(voterGeom, { lower, upper })
}
