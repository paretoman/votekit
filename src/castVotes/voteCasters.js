/** @module */

import castPlurality from './castPlurality.js'
import castScore from './castScore.js'
import castRanking from './castRanking.js'

/**
 * a collection of ways to cast votes
 */

const voteCasters = { castPlurality, castScore, castRanking }

export default voteCasters
