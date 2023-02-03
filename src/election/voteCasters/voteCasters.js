/** @module */

import castPlurality from './plurality/castPlurality.js'
import castScore from './score/castScore.js'
import castScoreLong from './score/castScoreLong.js'
import castRanking from './ranking/castRanking.js'
import castPluralityTestVote from './plurality/castPluralityTestVote.js'
import castScoreTestVote from './score/castScoreTestVote.js'
import castRankingTestVote from './ranking/castRankingTestVote.js'
import castPairwise from './pairwise/castPairwise.js'

/**
 * a collection of ways to cast votes
 */

const voteCasters = {
    plurality: { cast: castPlurality, castTestVote: castPluralityTestVote },
    score: { cast: castScore, castTestVote: castScoreTestVote },
    scoreLong: { cast: castScoreLong, castTestVote: castScoreTestVote },
    ranking: { cast: castRanking, castTestVote: castRankingTestVote },
    pairwise: { cast: castPairwise, castTestVote: castRankingTestVote },
}

export default voteCasters
