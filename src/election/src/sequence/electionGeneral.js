/** @module */

import electionPhase from '../polling/electionPhase.js'
import getGeometryForPhase from './getGeometryForPhase.js'
import getElectionPhaseOptions from './getPhaseOptions.js'
import { range } from '../util/mathHelpers.js'

/**
 * Here we are in the context of a single election with one general election phase.
 */
export default function electionGeneral(geometry, electionOptions) {
    const generalGeometry = getGeometryForPhase('general', geometry)
    const generalOptions = getElectionPhaseOptions('general', 'general', electionOptions)
    const general = electionPhase(generalGeometry, generalOptions)
    const { socialChoiceResults } = general
    const numCans = geometry.canPoints.length
    const results = {
        phases: {
            general,
        },
        indicesByPhase: {
            general: range(numCans),
        },
        geometry,
        electionOptions,
        socialChoiceResults,
    }
    return results
}