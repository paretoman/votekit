/** @module */

import election from '@paretoman/votekit-election'
import electionCycle from './electionCycle.js'

/**
 * Here we are in the context of a single election phase.
 * @param {*} geometry
 * @param {*} electionOptions
 * @param {*} optionsBag
 * @returns {*} electionResults
 */
export default function electionPhase(geometry, electionOptions, optionsBag) {
    const { castOptions } = optionsBag
    const { usePolls } = geometry

    if (usePolls) {
        return electionCycle(geometry, electionOptions, optionsBag)
    }

    return election(geometry, electionOptions, castOptions)
}
