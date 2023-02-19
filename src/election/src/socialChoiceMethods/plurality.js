/** @module */

import { maxIndex } from '../election/mathHelpers.js'

/**
 * the candidate with the highest tally wins
 * @param {object} kwargs
 * @param {object} kwargs.votes
 * @param {object} kwargs.votes.candidateTallies - vote tallies indexed by candidate
 * @param {number[]} votes.candidateTallies.voteFractionsByCan - The fraction of plurality votes for each candidate.
 * who chose a candidate, indexed by candidate.
 * @returns {object} socialChoiceResults = {iWinner} Index of winner. Indexing according to votes[].
 */
export default function plurality(votes) {
    const { voteFractionsByCan } = votes.candidateTallies
    const iWinner = maxIndex(voteFractionsByCan)

    const socialChoiceResults = { iWinner }
    return socialChoiceResults
}

/** @constant {object} - an object: this function and descriptions of its name, input, and output */
export const pluralityMetadata = {
    name: 'Plurality',
    shortName: 'Plurality',
    functionName: 'plurality',
    voteCasterName: 'plurality',
    socialChoiceType: 'singleWinner',
    elect: plurality,
}
