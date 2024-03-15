/** @module */

import { sumBlock, sumGaussian } from '../plurality/castPluralityIntervals1D.js'
/**
 * Sum density of voter distributions within intervals to tally the votes.
 */
export default function castRankingIntervals1D(voterGeom, geometry, castOptions) {
    const { intervalBorders, rankings, cansByRankList } = geometry.canBorders.rankingIntervals1D
    const { verbosity } = castOptions

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

    if (verbosity < 2) {
        return { voteCounts, totalVotes, cansByRankList }
    }
    return { voteCounts, totalVotes, cansByRankList, rankings, intervalBorders }
}

function sumInterval(lower, upper, voterGeom) {
    if (voterGeom.densityProfile === 'gaussian') {
        return sumGaussian(voterGeom, { lower, upper })
    }
    return sumBlock(voterGeom, { lower, upper })
}
