/** @module */

import castPlurality from '../plurality/castPlurality.js'
import castScore from '../score/castScore.js'
import castScoreFull from '../scoreFull/castScoreFull.js'
import castRanking from '../ranking/castRanking.js'
import castPluralityTestVote from '../plurality/castPluralityTestVote.js'
import castScoreTestVote from '../score/castScoreTestVote.js'
import castRankingTestVote from '../ranking/castRankingTestVote.js'
import castPairwise from '../pairwise/castPairwise.js'
import makeCanBordersPairwise from '../pairwise/makeCanBordersPairwise.js'
import makeCanBordersPlurality from '../plurality/makeCanBordersPlurality.js'
import makeCanBordersRanking from '../ranking/makeCanBordersRanking.js'

/**
 * a collection of ways to cast votes
 */

const voteCasters = {
    plurality: { cast: castPlurality, castTestVote: castPluralityTestVote, makeCanBorders: makeCanBordersPlurality },
    score: { cast: castScore, castTestVote: castScoreTestVote },
    scoreFull: { cast: castScoreFull, castTestVote: castScoreTestVote },
    ranking: { cast: castRanking, castTestVote: castRankingTestVote, makeCanBorders: makeCanBordersRanking },
    pairwise: { cast: castPairwise, castTestVote: castRankingTestVote, makeCanBorders: makeCanBordersPairwise },
}

export default voteCasters
