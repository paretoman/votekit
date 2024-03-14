/** @module */

import * as types from '@paretoman/votekit-types'
import { maxIndex } from '@paretoman/votekit-utilities'

/**
 * the candidate with the highest tally wins
 * @param {types.typesVotes.votes} votes - The object for vote data.
 * @returns {types.typesSocialChoice.socialChoiceResults} - the results returned from a social choice function.
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
