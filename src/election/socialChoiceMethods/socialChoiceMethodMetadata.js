/** @module */

import { pluralityMetadata } from './plurality.js'
import { randomWinnerMetadata } from './randomWinner.js'
import { huntingtonHillMetadata } from './huntingtonHill.js'
import { scoreMetadata } from './score.js'
import { stvMetadata } from './stv.js'
import { minimaxMetadata } from './minimax.js'
import { olprAMetadata } from './olprA.js'
import { dHondtMetadata } from './dHondt.js'
import { sainteLagueMetadata } from './sainteLague.js'
import { allocatedScoreMetadata } from './allocatedScore.js'
import { methodOfEqualSharesMetadata } from './methodOfEqualShares.js'

/** a collection of social choice methods in some order
 *  */
const socialChoiceMethodMetadata = [
    pluralityMetadata,
    randomWinnerMetadata,
    huntingtonHillMetadata,
    scoreMetadata,
    stvMetadata,
    minimaxMetadata,
    olprAMetadata,
    dHondtMetadata,
    sainteLagueMetadata,
    allocatedScoreMetadata,
    methodOfEqualSharesMetadata,
]

export const socialChoiceMethodMetadataByFunctionName = {}
socialChoiceMethodMetadata.forEach(
    (x) => { socialChoiceMethodMetadataByFunctionName[x.functionName] = x },
)

export default socialChoiceMethodMetadata
