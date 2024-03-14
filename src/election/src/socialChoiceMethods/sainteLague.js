/** @module */

import divisorGeneral from './divisorGeneral.js'
import * as typesVotes from '../types/typesVotes.js'
import * as typesSocialChoice from './typesSocialChoice.js'

/**
 * Run the Sainte-Lague / Webster method of apportionment and return an allocation of seats.
 * @param {typesVotes.votes} votes - The object for vote data.
 * @param {typesSocialChoice.socialChoiceOptions} socialChoiceOptions - options to specify a social choice function.
 * @returns {typesSocialChoice.socialChoiceResults} - the results returned from a social choice function.
 */

export default function sainteLague(votes, socialChoiceOptions) {
    const typeOfDivisor = 'sainteLague'
    const socialChoiceResults = divisorGeneral(votes, socialChoiceOptions, typeOfDivisor)
    return socialChoiceResults
}

/** @constant {object} - an object: this function and descriptions of its name, input, and output */
export const sainteLagueMetadata = {
    name: 'Sainte-Lague',
    shortName: 'Sainte-Lague',
    functionName: 'sainteLague',
    voteCasterName: 'plurality', // for input
    socialChoiceType: 'allocation',
    elect: sainteLague,
}
