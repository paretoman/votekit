/** @module */

/**
 * pick a random candidate as the winner
 * @param {Object} votes
 * @param {Number} votes.tallyFractions.length - Number of candidates.
 * @returns {Object} socialChoiceResults
 * @returns {Number} socialChoiceResults.iWinner - Index of winner. Indexing according to votes[].
 */
export default function randomCandidate({ votes }) {
    const nk = votes.candidateTallies.tallyFractions.length
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
