/** @module */

import { getCDF, randomIndexFromCDF } from '../election/mathHelpers.js'
import * as typesVotes from '../voteCasters/types/typesVotes.js'
import * as typesSocialChoice from './typesSocialChoice.js'

/**
 * pick a random voter to select the winner
 * @param {typesVotes.votes} votes - The object for vote data.
 * @returns {typesSocialChoice.socialChoiceResults} - the results returned from a social choice function.
 */
export default function randomVoter(votes) {
    const { voteFractionsByCan } = votes.candidateTallies
    const cdf = getCDF(voteFractionsByCan)
    const iWinner = randomIndexFromCDF(cdf, Math.random)
    const socialChoiceResults = { iWinner }
    return socialChoiceResults
}

/** @constant {object} - an object: this function and descriptions of its name, input, and output */
export const randomVoterMetadata = {
    name: 'Random Voter',
    explain: 'Random Voter: Pick a voter and their choice is the winning candidate.',
    shortName: 'Rand Vote',
    functionName: 'randomVoter',
    voteCasterName: 'plurality',
    socialChoiceType: 'singleWinner',
    elect: randomVoter,
}
