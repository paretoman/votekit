/** @module */

import castPlurality from './castPlurality.js'
import castScore from './castScore.js'
import castScoreLong from './castScoreLong.js'
import castRanking from './castRanking.js'
import castPluralityTestVote from './castPluralityTestVote.js'
import castScoreTestVote from './castScoreTestVote.js'
import castRankingTestVote from './castRankingTestVote.js'
import castPairwise from './castPairwise.js'

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
