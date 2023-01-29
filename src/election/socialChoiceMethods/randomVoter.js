/** @module */

import getCDF, { randomIndexFromCDF } from '../../utilities/mathUtilities.js'

/**
 * pick a random voter to select the winner
 * @param {Object} votes
 * @param {Number} votes.tallyFractions.length - Number of candidates.
 * @returns {Object} socialChoiceResults
 * @returns {Number} socialChoiceResults.iWinner - Index of winner. Indexing according to votes[].
 */
export default function randomVoter({ votes }) {
    const cdf = getCDF(votes.tallyFractions)
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
