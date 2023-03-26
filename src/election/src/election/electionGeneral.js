/** @module */

import electionPhase from './electionPhase.js'
import getElectionPhaseOptions from './getPhaseOptions.js'

/**
 * Here we are in the context of a single election with one general election phase.
 */
export default function electionGeneral(geometry, electionOptions) {
    const generalOptions = getElectionPhaseOptions('general', 'general', electionOptions)
    return electionPhase(geometry, generalOptions)
}
