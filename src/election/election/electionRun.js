/** @module */

import voteCasters from '../voteCasters/voteCasters.js'
import socialChoiceRun from './socialChoiceRun.js'

/**
 * Here we are in the context of a single election.
 */
export default function electionRun(geometry, electionOptions) {
    const { canGeoms, voterGeoms } = geometry
    if (voterGeoms.length === 0) return { error: 'No Voters' }
    if (canGeoms.length === 0) return { error: 'No Candidates' }

    const { castOptions } = electionOptions

    const votes = voteCasters[electionOptions.voteCasterName].cast(geometry, castOptions)
    const socialChoiceResults = socialChoiceRun(votes, electionOptions)
    const electionResults = {
        electionOptions, geometry, votes, socialChoiceResults,
    }
    return electionResults
}
