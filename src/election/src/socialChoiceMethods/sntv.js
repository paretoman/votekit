/** @module */

import { range } from '../util/mathHelpers.js'
import * as typesVotes from '../voteCasters/types/typesVotes.js'
import * as typesSocialChoice from './typesSocialChoice.js'

/**
 * Single Non-Transferable Vote
 * @param {typesVotes.votes} votes - The object for vote data.
 * @param {typesSocialChoice.socialChoiceOptions} socialChoiceOptions - options to specify a social choice function.
 * @returns {typesSocialChoice.socialChoiceResults} - the results returned from a social choice function.
 */
export default function sntv(votes, socialChoiceOptions) {
    const { voteFractionsByCan } = votes.candidateTallies
    const { seats } = socialChoiceOptions

    const nk = voteFractionsByCan.length

    if (seats >= nk) {
        // more seats than candidates, so elect all candidates
        const allocation = Array(nk).fill(1)
        const socialChoiceResults = { allocation }
        return socialChoiceResults
    }

    // sort descending
    const cansSorted = range(nk).sort((a, b) => voteFractionsByCan[b] - voteFractionsByCan[a])

    const allocation = Array(nk).fill(0)
    for (let r = 0; r < seats; r++) { // TODO: handle edge cases, like ties or zeros
        const canI = cansSorted[r]
        allocation[canI] = 1
    }
    const socialChoiceResults = { allocation }
    return socialChoiceResults
}

/** @constant {object} - an object: this function and descriptions of its name, input, and output */
export const sntvMetadata = {
    name: 'Single Non-Transferable Vote',
    shortName: 'SNTV',
    functionName: 'sntv',
    voteCasterName: 'plurality',
    socialChoiceType: 'multiWinner',
    elect: sntv,
}
