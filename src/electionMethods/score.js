/** @module */

/**
 * the candidate with the highest tally wins
 * @param {Object} votes
 * @param {Number[]} votes.tallyFractions
 * @returns {Object} results
 * @returns {Number} iWinner - Index of winner. Indexing according to votes[].
 */
export default function score(votes) {
    const max = Math.max(...votes.tallyFractions)
    const iWinner = votes.tallyFractions.indexOf(max)

    const results = { iWinner }
    return results
}
