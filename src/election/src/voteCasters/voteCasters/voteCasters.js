/** @module */

import castPlurality from '../plurality/castPlurality.js'
import castScore from '../score/castScore.js'
import castScoreFull from '../scoreFull/castScoreFull.js'
import castRanking from '../ranking/castRanking.js'
import castPluralityPoint from '../plurality/castPluralityPoint.js'
import castScorePoint from '../score/castScorePoint.js'
import castRankingPoint from '../ranking/castRankingPoint.js'
import castPairwise from '../pairwise/castPairwise.js'
import castPairwisePoint from '../pairwise/castPairwisePoint.js'
import makeCanBordersPairwise from '../pairwise/makeCanBordersPairwise.js'
import makeCanBordersPlurality from '../plurality/makeCanBordersPlurality.js'
import makeCanBordersRanking from '../ranking/makeCanBordersRanking.js'

/**
 * a collection of ways to cast votes
 */

const voteCasters = {
    plurality: { cast: castPlurality, castPoint: castPluralityPoint, makeCanBorders: makeCanBordersPlurality },
    score: { cast: castScore, castPoint: castScorePoint },
    scoreFull: { cast: castScoreFull, castPoint: castScorePoint },
    ranking: { cast: castRanking, castPoint: castRankingPoint, makeCanBorders: makeCanBordersRanking },
    pairwise: { cast: castPairwise, castPoint: castPairwisePoint, makeCanBorders: makeCanBordersPairwise },
}

export function getCanBorders(canPoints, voterGeoms, dimensions, voteCasterName) {
    const { makeCanBorders } = voteCasters[voteCasterName]
    if (makeCanBorders !== undefined) {
        const canBorders = makeCanBorders(canPoints, voterGeoms, dimensions)
        return canBorders
    }
    return {}
}

export default voteCasters
