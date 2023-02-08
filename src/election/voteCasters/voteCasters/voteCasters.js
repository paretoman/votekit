/** @module */

import castPlurality from '../plurality/castPlurality.js'
import castScore from '../score/castScore.js'
import castScoreLong from '../score/castScoreLong.js'
import castRanking from '../ranking/castRanking.js'
import castPluralityTestVote from '../plurality/castPluralityTestVote.js'
import castScoreTestVote from '../score/castScoreTestVote.js'
import castRankingTestVote from '../ranking/castRankingTestVote.js'
import castPairwise from '../pairwise/castPairwise.js'
import makeCanBordersPairwise from '../pairwise/makeCanBordersPairwise.js'
import makeCanBordersPlurality from '../plurality/makeCanBordersPlurality.js'

/**
 * a collection of ways to cast votes
 */

const voteCasters = {
    plurality: { cast: castPlurality, castTestVote: castPluralityTestVote, makeCanBorders: makeCanBordersPlurality },
    score: { cast: castScore, castTestVote: castScoreTestVote },
    scoreLong: { cast: castScoreLong, castTestVote: castScoreTestVote },
    ranking: { cast: castRanking, castTestVote: castRankingTestVote },
    pairwise: { cast: castPairwise, castTestVote: castRankingTestVote, makeCanBorders: makeCanBordersPairwise },
}

export default voteCasters
