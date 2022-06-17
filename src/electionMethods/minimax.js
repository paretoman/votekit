/** @module */

/**
 * the candidate with the highest tally wins
 * @param {Object} votes
 * @param {Number[]} votes.tallyFractions
 * @returns {socialChoiceResults}
 */
export default function minimax(votes) {
    const nk = votes.pairwiseTallyFractions.length
    const iWinner = Math.floor(Math.random() * nk)
    const socialChoiceResults = { iWinner }
    return socialChoiceResults
}
/**
 * @typedef {Object} socialChoiceResults
 * @property {Number} iWinner - Index of winner. Indexing according to votes[].
 */
