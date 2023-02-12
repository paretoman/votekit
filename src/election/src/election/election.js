/** @module */

import districtElection from '../districtElection/districtElection.js'
import electionRun from './electionRun.js'

/**
 * Here we are in the context of a single election.
 */
export default function election(geometry, electionOptions) {
    const { canGeoms, voterGeoms } = geometry
    if (voterGeoms.length === 0) return { error: 'No Voters' }
    if (canGeoms.length === 0) return { error: 'No Candidates' }

    let electionResults
    if (electionOptions.useGeography) {
        electionResults = districtElection(geometry, electionOptions)
    } else {
        electionResults = electionRun(geometry, electionOptions)
    }

    return electionResults
}
