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
