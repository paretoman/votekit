/** @module */

import divisorGeneral from './divisorGeneral.js'
import * as typesVotes from '../types/typesVotes.js'
import * as typesSocialChoice from './typesSocialChoice.js'

/**
 * Run the d'Hondt / Jefferson method of apportionment and return an allocation of seats.
 * @param {typesVotes.votes} votes - The object for vote data.
 * @param {typesSocialChoice.socialChoiceOptions} socialChoiceOptions - options to specify a social choice function.
 * @returns {typesSocialChoice.socialChoiceResults} - the results returned from a social choice function.
 */

export default function dHondt(votes, socialChoiceOptions) {
    const typeOfDivisor = 'dHondt'
    const socialChoiceResults = divisorGeneral(votes, socialChoiceOptions, typeOfDivisor)
    return socialChoiceResults
}

/** @constant {object} - an object: this function and descriptions of its name, input, and output */
export const dHondtMetadata = {
    name: "d'Hondt",
    shortName: "d'Hondt",
    functionName: 'dHondt',
    voteCasterName: 'plurality', // for input
    socialChoiceType: 'allocation',
    elect: dHondt,
}
