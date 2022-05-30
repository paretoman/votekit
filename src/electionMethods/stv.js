/** @module */

/**
 * the candidate with the highest tally wins
 * @param {Object} votes
 * @param {Number[]} votes.tallyFractions
 * @returns {socialChoiceResults}
 */
export default function plurality(votes) {
    const max = Math.max(...votes.tallyFractions)
    const iWinner = votes.tallyFractions.indexOf(max)

    const socialChoiceResults = { iWinner }
    return socialChoiceResults
}
/**
 * @typedef {Object} socialChoiceResults
 * @property {Number} iWinner - Index of winner. Indexing according to votes[].
 */
