/** @module */

import { maxIndex } from '../utilities/jsHelpers.js'

/**
 * the candidate with the highest tally wins
 * @param {Object} votes
 * @param {Number[]} votes.tallyFractions - A list of fractions of voters
 * who chose a candidate, indexed by candidate.
 * @returns {Object} socialChoiceResults
 * @returns {Number} socialChoiceResults.iWinner - Index of winner. Indexing according to votes[].
 */
export default function plurality(votes) {
    const iWinner = maxIndex(votes.tallyFractions)

    const socialChoiceResults = { iWinner }
    return socialChoiceResults
}
