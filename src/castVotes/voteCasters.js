/** @module */

import castPlurality from './castPlurality.js'
import castScore from './castScore.js'
import castRanking from './castRanking.js'
import castPluralityTestVote from './castPluralityTestVote.js'
import castScoreTestVote from './castScoreTestVote.js'
import castRankingTestVote from './castRankingTestVote.js'
import castPairwise from './castPairwise.js'
import castOLPRA from './castOLPRA.js'
import castOLPRATestVote from './castOLPRATestVote.js'

/**
 * a collection of ways to cast votes
 */

const voteCasters = {
    plurality: { cast: castPlurality, castTestVote: castPluralityTestVote },
    score: { cast: castScore, castTestVote: castScoreTestVote },
    ranking: { cast: castRanking, castTestVote: castRankingTestVote },
    pairwise: { cast: castPairwise, castTestVote: castRankingTestVote },
    olprA: { cast: castOLPRA, castTestVote: castOLPRATestVote },
}

export default voteCasters
