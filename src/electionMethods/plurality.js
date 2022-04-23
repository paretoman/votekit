/** @module */

/**
 * the candidate with the highest tally wins
 * @param {Object} votes
 * @param {Number[]} votes.tallyFractions
 * @returns {countResults}
 */
export default function plurality(votes) {
    const max = Math.max(...votes.tallyFractions)
    const iWinner = votes.tallyFractions.indexOf(max)

    const countResults = { iWinner }
    return countResults
}
/**
 * @typedef {Object} countResults
 * @property {Number} iWinner - Index of winner. Indexing according to votes[].
 */
