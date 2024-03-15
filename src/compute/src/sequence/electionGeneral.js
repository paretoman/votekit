/** @module */

import electionPhase from '../polling/electionPhase.js'
import getGeometryForPhase from './getGeometryForPhase.js'
import getElectionOptions from './getElectionOptions.js'

/**
 * Here we are in the context of the simplest election sequence with one general election phase.
 */
export default function electionGeneral(geometry, optionsBag) {
    const generalGeometry = getGeometryForPhase('general', geometry)
    const generalOptions = getElectionOptions('general', 'general', optionsBag)
    const general = electionPhase(generalGeometry, generalOptions, optionsBag)
    const { socialChoiceResults } = general
    const results = {
        phases: {
            general,
        },
        geometry,
        optionsBag,
        socialChoiceResults,
    }
    return results
}