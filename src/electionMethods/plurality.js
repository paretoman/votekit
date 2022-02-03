/** @module */

/**
 * the candidate with the highest tally wins
 * @param {Object} votes
 * @param {Number[]} votes.tallyFractions
 * @returns {results}
 */
export default function plurality(votes) {
    const max = Math.max(...votes.tallyFractions)
    const iWinner = votes.tallyFractions.indexOf(max)

    const results = { iWinner }
    return results
}
/**
 * @typedef {Object} results
 * @property {Number} iWinner - Index of winner. Indexing according to votes[].
 */
