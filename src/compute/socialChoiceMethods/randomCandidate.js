/** @module */
import * as types from '@paretoman/votekit-types'
/**
 * pick a random candidate as the winner
 * @param {types.typesVotes.votes} votes - The object for vote data.
 * @returns {types.typesSocialChoice.socialChoiceResults} - the results returned from a social choice function.
 */
export default function randomCandidate(votes) {
    const { voteFractionsByCan } = votes.candidateTallies
    const nk = voteFractionsByCan.length
    const iWinner = Math.floor(Math.random() * nk)
    const socialChoiceResults = { iWinner }
    return socialChoiceResults
}

/** @constant {object} - an object: this function and descriptions of its name, input, and output */
export const randomCandidateMetadata = {
    name: 'Random Candidate',
    shortName: 'Rand Cand',
    functionName: 'randomCandidate',
    voteCasterName: 'plurality',
    socialChoiceType: 'singleWinner',
    elect: randomCandidate,
}
