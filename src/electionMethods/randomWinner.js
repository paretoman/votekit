/** @module */

/**
 * pick a random candidate as the winner
 * @param {Object} votes
 * @param {Number} votes.tallyFractions.length - Number of candidates.
 * @returns {countResults}
 */
export default function randomWinner(votes) {
    const nk = votes.tallyFractions.length
    const iWinner = Math.floor(Math.random() * nk)
    const countResults = { iWinner }
    return countResults
}
/**
 * @typedef {Object} countResults
 * @property {Number} iWinner - Index of winner. Indexing according to votes[].
 */
