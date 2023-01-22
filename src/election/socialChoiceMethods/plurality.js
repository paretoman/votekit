/** @module */

import { maxIndex } from '../../utilities/jsHelpers.js'

/**
 * the candidate with the highest tally wins
 * @param {Object} kwargs
 * @param {Object} kwargs.votes
 * @param {Number[]} kwargs.votes.tallyFractions - A list of fractions of voters
 * who chose a candidate, indexed by candidate.
 * @returns {Object} socialChoiceResults = {iWinner} Index of winner. Indexing according to votes[].
 */
export default function plurality({ votes }) {
    const iWinner = maxIndex(votes.tallyFractions)

    const socialChoiceResults = { iWinner }
    return socialChoiceResults
}

/** @constant {Object} - an object: this function and descriptions of its name, input, and output */
export const pluralityMetadata = {
    name: 'Plurality',
    shortName: 'Plurality',
    functionName: 'plurality',
    voteCasterName: 'plurality',
    socialChoiceType: 'singleWinner',
    elect: plurality,
}
