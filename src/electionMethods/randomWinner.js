/** @module */

/**
 * pick a random candidate as the winner
 * @param {Object} votes
 * @param {Number} votes.tallyFractions.length - Number of candidates.
 * @returns {socialChoiceResults}
 */
export default function randomWinner(votes) {
    const nk = votes.tallyFractions.length
    const iWinner = Math.floor(Math.random() * nk)
    const socialChoiceResults = { iWinner }
    return socialChoiceResults
}
/**
 * @typedef {Object} socialChoiceResults
 * @property {Number} iWinner - Index of winner. Indexing according to votes[].
 */
