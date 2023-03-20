/** @module */

import districtElection from '../districtElection/districtElection.js'
import electionCycle from './electionCycle.js'
import electionRun from './electionRun.js'

/**
 * Here we are in the context of a single election phase.
 */
export default function electionPhase(geometry, electionOptions) {
    const { useGeography } = electionOptions
    const { usePolls } = geometry

    if (usePolls) {
        return electionCycle(geometry, electionOptions)
    }
    if (useGeography) {
        return districtElection(geometry, electionOptions)
    }

    return electionRun(geometry, electionOptions)
}
