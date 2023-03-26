/** @module */

import electionPhase from './electionPhase.js'
import getGeometryForPhase from './getGeometryForPhase.js'
import getElectionPhaseOptions from './getPhaseOptions.js'

/**
 * Here we are in the context of a single election with one general election phase.
 */
export default function electionGeneral(geometry, electionOptions) {
    const generalGeometry = getGeometryForPhase('general', geometry)
    const generalOptions = getElectionPhaseOptions('general', 'general', electionOptions)
    const general = electionPhase(generalGeometry, generalOptions)
    const { socialChoiceResults } = general
    const results = {
        phases: {
            general,
        },
        geometry,
        electionOptions,
        socialChoiceResults,
    }
    return results
}
