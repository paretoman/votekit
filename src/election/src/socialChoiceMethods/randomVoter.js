/** @module */

import { getCDF, randomIndexFromCDF } from '../election/mathHelpers.js'

/**
 * pick a random voter to select the winner
 * @param {Object} votes
 * @param {Object} votes.candidateTallies - vote tallies indexed by candidate
 * @param {number[]} votes.candidateTallies.voteFractionsByCan - The fraction of plurality votes for each candidate.
 * @returns {Object} socialChoiceResults
 * @returns {number} socialChoiceResults.iWinner - Index of winner. Indexing according to votes[].
 */
export default function randomVoter(votes) {
    const { voteFractionsByCan } = votes.candidateTallies
    const cdf = getCDF(voteFractionsByCan)
    const iWinner = randomIndexFromCDF(cdf)
    const socialChoiceResults = { iWinner }
    return socialChoiceResults
}

/** @constant {Object} - an object: this function and descriptions of its name, input, and output */
export const randomVoterMetadata = {
    name: 'Random Voter',
    explain: 'Random Voter: Pick a voter and their choice is the winning candidate.',
    shortName: 'Rand Vote',
    functionName: 'randomVoter',
    voteCasterName: 'plurality',
    socialChoiceType: 'singleWinner',
    elect: randomVoter,
}
