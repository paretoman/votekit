/** @module */

import districtElection from '../districtElection/districtElection.js'
import electionCycle from './electionCycle.js'
import electionRun from './electionRun.js'

/**
 * Here we are in the context of a single election phase.
 */
export default function electionPhase(geometry, electionPhaseOptions) {
    const { useGeography } = electionPhaseOptions
    const { usePolls } = geometry

    if (usePolls) {
        return electionCycle(geometry, electionPhaseOptions)
    }
    if (useGeography) {
        return districtElection(geometry, electionPhaseOptions)
    }

    return electionRun(geometry, electionPhaseOptions)
}
