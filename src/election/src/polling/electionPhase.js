/** @module */

import districtElection from '../districtElection/districtElection.js'
import electionCycle from './electionCycle.js'
import election from '../election/election.js'

/**
 * Here we are in the context of a single election phase.
 */
export default function electionPhase(geometry, electionOptions, optionsBag) {
    const { useGeography } = electionOptions
    const { usePolls } = geometry

    if (usePolls) {
        return electionCycle(geometry, electionOptions, optionsBag)
    }
    if (useGeography) {
        return districtElection(geometry, electionOptions)
    }

    return election(geometry, electionOptions)
}
