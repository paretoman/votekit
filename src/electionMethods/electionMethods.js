/** @module */

import plurality from './plurality.js'
import randomWinner from './randomWinner.js'
import huntingtonHill from './huntingtonHill.js'

/** a collection of election methods
 *  */
const electionMethods = { plurality, randomWinner, huntingtonHill }

export default electionMethods
