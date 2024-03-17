/** @module */

import electionPhase from '@paretoman/votekit-election-phase'
import { range } from '@paretoman/votekit-utilities'
import getGeometryForPhase from './getGeometryForPhase.js'
import getElectionOptions from './getElectionOptions.js'

/**
 * Here we are in the context of the simplest election sequence with one general election phase.
 * @param {*} geometry
 * @param {*} optionsBag
 * @returns
 */
export default function electionGeneral(geometry, optionsBag) {
    const generalGeometry = getGeometryForPhase('general', geometry)
    const allCanLabels = range(geometry.canPoints.length)
    generalGeometry.canLabels = allCanLabels

    const generalOptions = getElectionOptions('general', 'general', optionsBag)
    const general = electionPhase(generalGeometry, generalOptions, optionsBag)
    const { socialChoiceResults } = general
    const results = {
        phases: {
            general,
        },
        phaseNames: ['general'],
        geometry,
        optionsBag,
        socialChoiceResults,
    }
    return results
}
