/** @module */

import plurality from './plurality.js'
import randomWinner from './randomWinner.js'
import huntingtonHill from './huntingtonHill.js'
import score from './score.js'
import stv from './stv.js'
import minimax from './minimax.js'
import olprA from './olprA.js'
import dHondt from './dHondt.js'
import sainteLague from './sainteLague.js'
import allocatedScore from './allocatedScore.js'
import methodOfEqualShares from './methodOfEqualShares.js'

/** a collection of social choice methods
 *  */
const socialChoiceMethods = {
    plurality,
    randomWinner,
    huntingtonHill,
    score,
    stv,
    minimax,
    olprA,
    dHondt,
    sainteLague,
    allocatedScore,
    methodOfEqualShares,
}

export default socialChoiceMethods
