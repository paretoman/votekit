/** @module */
import * as typesVotes from '../types/typesVotes.js'
import * as typesSocialChoice from './typesSocialChoice.js'

/**
 * the candidate with the highest tally wins
 * @param {typesVotes.votes} votes - The object for vote data.
 * @returns {typesSocialChoice.socialChoiceResults} - the results returned from a social choice function.
 */
export default function score(votes) {
    const { scoreFractionAverageByCan } = votes.candidateTallies
    const max = Math.max(...scoreFractionAverageByCan)
    const iWinner = scoreFractionAverageByCan.indexOf(max)

    const results = { iWinner }
    return results
}

/** @constant {object} - an object: this function and descriptions of its name, input, and output */
export const scoreMetadata = {
    name: 'Score',
    shortName: 'Score',
    functionName: 'score',
    voteCasterName: 'score', // for input
    socialChoiceType: 'singleWinner',
    elect: score,
}
