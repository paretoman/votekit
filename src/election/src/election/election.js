/** @module */

import districtElection from '../districtElection/districtElection.js'
import electionCycle from './electionCycle.js'
import electionRun from './electionRun.js'

/**
 * Here we are in the context of a single election.
 */
export default function election(geometry, electionOptions) {
    const { canPoints, voterGeoms } = geometry
    if (voterGeoms.length === 0) return { error: 'No Voters' }
    if (canPoints.length === 0) return { error: 'No Candidates' }

    const { useGeography, usePolls } = electionOptions

    let electionResults
    if (usePolls) {
        electionResults = electionCycle(geometry, electionOptions)
        return electionResults
    }
    if (useGeography) {
        electionResults = districtElection(geometry, electionOptions)
        return electionResults
    }

    electionResults = electionRun(geometry, electionOptions)
    return electionResults
}
