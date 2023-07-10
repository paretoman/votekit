/** @module */

import { maxIndex } from '../util/mathHelpers.js'
import * as typesVotes from '../voteCasters/types/typesVotes.js'
import * as typesSocialChoice from './typesSocialChoice.js'

/**
 * the candidate with the highest tally wins
 * @param {typesVotes.votes} votes - The object for vote data.
 * @returns {typesSocialChoice.socialChoiceResults} - the results returned from a social choice function.
 */
export default function plurality(votes) {
    const { voteFractionsByCan } = votes.candidateTallies
    const iWinner = maxIndex(voteFractionsByCan)

    const socialChoiceResults = { iWinner }
    return socialChoiceResults
}

/** @constant {object} - an object: this function and descriptions of its name, input, and output */
export const pluralityMetadata = {
    name: 'Plurality',
    shortName: 'Plurality',
    functionName: 'plurality',
    voteCasterName: 'plurality',
    socialChoiceType: 'singleWinner',
    elect: plurality,
}
