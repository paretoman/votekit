/** @module */

import districtElection from '../districtElection/districtElection.js'
import electionRun from './electionRun.js'

/**
 * Here we are in the context of a single election.
 */
export default function election(geometry, electionOptions) {
    const { canPoints, voterGeoms } = geometry
    if (voterGeoms.length === 0) return { error: 'No Voters' }
    if (canPoints.length === 0) return { error: 'No Candidates' }

    const { useGeography, usePolls, pollCount } = electionOptions

    let electionResults
    if (usePolls) {
        // run several elections and store the results in electionResultsList
        // return the last one
        const electionResultsList = []
        for (let i = 0; i < pollCount + 1; i++) {
            const geometry1 = { ...geometry }
            geometry1.information = { electionResultsList }
            let electionResults1
            if (useGeography) {
                electionResults1 = districtElection(geometry1, electionOptions)
            } else {
                electionResults1 = electionRun(geometry1, electionOptions)
            }
            electionResultsList.push(electionResults1)
        }
        return electionResultsList[pollCount]
    }
    if (useGeography) {
        electionResults = districtElection(geometry, electionOptions)
    } else {
        electionResults = electionRun(geometry, electionOptions)
    }

    return electionResults
}
