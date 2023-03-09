/** @module */

import districtElection from '../districtElection/districtElection.js'
import electionRun from './electionRun.js'

/**
 * Here we are in the context of an election cycle with polls followed by a single election.
 */
export default function electionCycle(geometry, electionOptions) {
    const { useGeography, pollCount } = electionOptions

    // run several elections and store the results in electionResultsList
    // return the last one

    let electionResults
    const electionResultsList = []
    for (let i = 0; i < pollCount + 1; i++) {
        const geometry1 = { ...geometry }
        geometry1.information = { electionResultsList }
        if (useGeography) {
            electionResults = districtElection(geometry1, electionOptions)
        } else {
            electionResults = electionRun(geometry1, electionOptions)
        }
        electionResultsList.push(electionResults)
    }
    return electionResults
}
