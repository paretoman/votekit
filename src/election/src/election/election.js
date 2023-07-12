/** @module */

import castVotesRun from './castVotesRun.js'
import socialChoiceRun from './socialChoiceRun.js'

/**
 * Here we are in the context of a single election.
 */
export default function election(geometry, electionPhaseOptions) {
    const votes = castVotesRun(geometry, electionPhaseOptions)
    const socialChoiceResults = socialChoiceRun(votes, electionPhaseOptions)
    const electionResults = { geometry, electionPhaseOptions, votes, socialChoiceResults }
    return electionResults
}
