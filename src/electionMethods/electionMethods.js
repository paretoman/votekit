/** @module */

import plurality from './plurality.js'
import randomWinner from './randomWinner.js'
import huntingtonHill from './huntingtonHill.js'
import score from './score.js'
import stv from './stv.js'
import minimax from './minimax.js'
import olprA from './olprA.js'

/** a collection of election methods
 *  */
const electionMethods = {
    plurality, randomWinner, huntingtonHill, score, stv, minimax, olprA,
}

export default electionMethods
