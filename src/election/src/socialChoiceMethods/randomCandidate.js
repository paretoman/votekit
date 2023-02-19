/** @module */

/**
 * pick a random candidate as the winner
 * @param {Object} votes
 * @param {Object} votes.candidateTallies - vote tallies indexed by candidate
 * @param {number[]} votes.candidateTallies.voteFractionsByCan - The fraction of plurality votes for each candidate.
 * @returns {Object} socialChoiceResults
 * @returns {number} socialChoiceResults.iWinner - Index of winner. Indexing according to votes[].
 */
export default function randomCandidate(votes) {
    const { voteFractionsByCan } = votes.candidateTallies
    const nk = voteFractionsByCan.length
    const iWinner = Math.floor(Math.random() * nk)
    const socialChoiceResults = { iWinner }
    return socialChoiceResults
}

/** @constant {Object} - an object: this function and descriptions of its name, input, and output */
export const randomCandidateMetadata = {
    name: 'Random Candidate',
    shortName: 'Rand Cand',
    functionName: 'randomCandidate',
    voteCasterName: 'plurality',
    socialChoiceType: 'singleWinner',
    elect: randomCandidate,
}
