/** @module */

import plurality from './plurality.js'
import randomWinner from './randomWinner.js'
import huntingtonHill from './huntingtonHill.js'
import score from './score.js'

/** a collection of election methods
 *  */
const electionMethods = {
    plurality, randomWinner, huntingtonHill, score,
}

export default electionMethods
