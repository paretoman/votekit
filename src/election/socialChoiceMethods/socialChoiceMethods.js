/** @module */

import { pluralityMetadata } from './plurality.js'
import { randomCandidateMetadata } from './randomCandidate.js'
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
export const socialChoiceMethodMetadata = [
    pluralityMetadata,
    randomCandidateMetadata,
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

export const socialChoiceMethods = {}
export const socialChoiceMethodMetadataByFunctionName = {}

socialChoiceMethodMetadata.forEach((x) => {
    socialChoiceMethods[x.functionName] = x.elect
    socialChoiceMethodMetadataByFunctionName[x.functionName] = x
})

export default socialChoiceMethods
