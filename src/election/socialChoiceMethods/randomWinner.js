/** @module */

/**
 * pick a random candidate as the winner
 * @param {Object} votes
 * @param {Number} votes.tallyFractions.length - Number of candidates.
 * @returns {Object} socialChoiceResults
 * @returns {Number} socialChoiceResults.iWinner - Index of winner. Indexing according to votes[].
 */
export default function randomWinner({ votes }) {
    const nk = votes.tallyFractions.length
    const iWinner = Math.floor(Math.random() * nk)
    const socialChoiceResults = { iWinner }
    return socialChoiceResults
}

/** @constant {Object} - an object: this function and descriptions of its name, input, and output */
export const randomWinnerMetadata = {
    name: 'Random Winner',
    shortName: 'Random Winner',
    functionName: 'randomWinner',
    voteCasterName: 'plurality',
    socialChoiceType: 'singleWinner',
}
