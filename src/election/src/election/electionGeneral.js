/** @module */

import electionPhase from './electionPhase.js'

/**
 * Here we are in the context of a single election with one general election phase.
 */
export default function electionGeneral(geometry, electionOptions) {
    // choose the phase options from sequenceOptions
    const electionPhaseOptions = { ...electionOptions }
    electionPhaseOptions.phaseOptions = electionPhaseOptions.sequenceOptions.sequences.general.phases.general
    delete electionPhaseOptions.sequenceOptions

    return electionPhase(geometry, electionPhaseOptions)
}
