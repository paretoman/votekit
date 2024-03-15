/** @module */

import castVotesRun from './castVotesRun.js'
import socialChoiceRun from './socialChoiceRun.js'

/**
 * Here we are in the context of a single election.
 * @param {*} geometry
 * @param {*} electionOptions
 * @param {*} castOptions
 * @returns {*}
 */
export default function election(geometry, electionOptions, castOptions) {
    const votes = castVotesRun(geometry, electionOptions, castOptions)
    const socialChoiceResults = socialChoiceRun(votes, electionOptions)
    const electionResults = { geometry, electionOptions, votes, socialChoiceResults }
    return electionResults
}
