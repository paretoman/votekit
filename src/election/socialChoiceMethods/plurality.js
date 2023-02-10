/** @module */

import { maxIndex } from '../../utilities/jsHelpers.js'

/**
 * the candidate with the highest tally wins
 * @param {Object} kwargs
 * @param {Object} kwargs.votes
 * @param {Object} kwargs.votes.candidateTallies - vote tallies indexed by candidate
 * @param {Number[]} votes.candidateTallies.voteFractionsByCan - The fraction of plurality votes for each candidate.
 * who chose a candidate, indexed by candidate.
 * @returns {Object} socialChoiceResults = {iWinner} Index of winner. Indexing according to votes[].
 */
export default function plurality({ votes }) {
    const { voteFractionsByCan } = votes.candidateTallies
    const iWinner = maxIndex(voteFractionsByCan)

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
