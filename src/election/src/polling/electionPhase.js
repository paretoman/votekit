/** @module */

import electionCycle from './electionCycle.js'
import election from '../election/election.js'

/**
 * Here we are in the context of a single election phase.
 */
export default function electionPhase(geometry, electionOptions, optionsBag) {
    const { castOptions } = optionsBag
    const { usePolls } = geometry

    if (usePolls) {
        return electionCycle(geometry, electionOptions, optionsBag)
    }

    return election(geometry, electionOptions, castOptions)
}
