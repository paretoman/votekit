/** @module */

import electionClosedPrimary from './electionClosedPrimary.js'
import electionGeneral from './electionGeneral.js'
import electionNonpartisanPrimary from './electionNonPartisanPrimary.js'

/**
 * Here we are in the context of a single election.
 */
export default function electionSequence(geometry, electionOptions) {
    const { canPoints, voterGeoms } = geometry
    if (voterGeoms.length === 0) return { error: 'No Voters' }
    if (canPoints.length === 0) return { error: 'No Candidates' }

    const { sequenceName } = electionOptions.sequenceOptions
    if (sequenceName === 'closedPrimary') {
        return electionClosedPrimary(geometry, electionOptions)
    }
    if (sequenceName === 'nonpartisanOpenPrimary') {
        return electionNonpartisanPrimary(geometry, electionOptions)
    }
    // sequence === 'general'
    return electionGeneral(geometry, electionOptions)
}
