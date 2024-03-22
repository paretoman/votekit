/** @module */

import electionClosedPrimary from './electionClosedPrimary.js'
import electionGeneral from './electionGeneral.js'
import electionNonpartisanPrimary from './electionNonPartisanPrimary.js'
import getGeometryForPhase from './getGeometryForPhase.js'

export { getGeometryForPhase }

/**
 * Here we are in the context of an election sequence.
 * @param {*} geometry
 * @param {*} optionsBag
 * @returns
 */
export default function electionSequence(geometry, optionsBag) {
    const { canPoints, voterGeoms } = geometry
    if (voterGeoms.length === 0) return { error: 'No Voters' }
    if (canPoints.length === 0) return { error: 'No Candidates' }

    const { sequenceName } = optionsBag.sequenceOptions
    if (sequenceName === 'closedPrimary') {
        return electionClosedPrimary(geometry, optionsBag)
    }
    if (sequenceName === 'nonpartisanOpenPrimary') {
        return electionNonpartisanPrimary(geometry, optionsBag)
    }
    // sequence === 'general'
    return electionGeneral(geometry, optionsBag)
}
