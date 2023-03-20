/** @module */

import electionGeneral from './electionGeneral.js'

/**
 * Here we are in the context of a single election.
 */
export default function election(geometry, electionOptions) {
    const { canPoints, voterGeoms } = geometry
    if (voterGeoms.length === 0) return { error: 'No Voters' }
    if (canPoints.length === 0) return { error: 'No Candidates' }

    // sequence === 'general'
    return electionGeneral(geometry, electionOptions)
}
