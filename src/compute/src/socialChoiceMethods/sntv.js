/** @module */

import { range } from '@paretoman/votekit-utilities'
import * as types from '@paretoman/votekit-types'

/**
 * Single Non-Transferable Vote
 * @param {types.typesVotes.votes} votes - The object for vote data.
 * @param {types.typesSocialChoice.socialChoiceOptions} socialChoiceOptions - options to specify a social choice function.
 * @returns {types.typesSocialChoice.socialChoiceResults} - the results returned from a social choice function.
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
