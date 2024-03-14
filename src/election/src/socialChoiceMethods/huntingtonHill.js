/** @module */

import divisorGeneral from './divisorGeneral.js'
import * as typesVotes from '../types/typesVotes.js'
import * as typesSocialChoice from './typesSocialChoice.js'

/**
 * Run the Huntington-Hill method of apportionment and return an allocation of seats.
 * @param {typesVotes.votes} votes - The object for vote data.
 * @param {typesSocialChoice.socialChoiceOptions} socialChoiceOptions - options to specify a social choice function.
 * @returns {typesSocialChoice.socialChoiceResults} - the results returned from a social choice function.
 */

export default function huntingtonHill(votes, socialChoiceOptions) {
    const typeOfDivisor = 'huntingtonHill'
    const socialChoiceResults = divisorGeneral(votes, socialChoiceOptions, typeOfDivisor)

    return socialChoiceResults
}

/** @constant {object} - an object: this function and descriptions of its name, input, and output */
export const huntingtonHillMetadata = {
    name: 'Huntington Hill',
    shortName: 'Huntington',
    functionName: 'huntingtonHill',
    voteCasterName: 'plurality', // for input
    socialChoiceType: 'allocation', // for output
    elect: huntingtonHill,
}
