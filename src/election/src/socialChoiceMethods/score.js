/** @module */

/**
 * the candidate with the highest tally wins
 * @param {Object} votes
 * @param {Object} votes.candidateTallies - vote tallies indexed by candidate
 * @param {number[]} votes.candidateTallies.scoreFractionAverageByCan - average fractional score for each candidate.
 * @returns {Object} results
 * @returns {number} iWinner - Index of winner. Indexing according to votes[].
 */
export default function score(votes) {
    const { scoreFractionAverageByCan } = votes.candidateTallies
    const max = Math.max(...scoreFractionAverageByCan)
    const iWinner = scoreFractionAverageByCan.indexOf(max)

    const results = { iWinner }
    return results
}

/** @constant {Object} - an object: this function and descriptions of its name, input, and output */
export const scoreMetadata = {
    name: 'Score',
    shortName: 'Score',
    functionName: 'score',
    voteCasterName: 'score', // for input
    socialChoiceType: 'singleWinner',
    elect: score,
}
