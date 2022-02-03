/** @module */

/**
 * pick a random candidate as the winner
 * @param {Object} votes
 * @param {Number} votes.tallyFractions.length - Number of candidates.
 * @returns {results}
 */
export default function randomWinner(votes) {
    const nk = votes.tallyFractions.length
    const iWinner = Math.floor(Math.random() * nk)
    const results = { iWinner }
    return results
}
/**
 * @typedef {Object} results
 * @property {Number} iWinner - Index of winner. Indexing according to votes[].
 */
