/** @module */

import calculatePolling from './calculatePolling.js'
import election from '../election/election.js'

/**
 * Here we are in the context of an election cycle with polls followed by a single election.
 */
export default function electionCycle(geometry, electionOptions, optionsBag) {
    const { pollCount } = optionsBag

    // run several elections and store the results in electionResultsList
    // return the last one

    let electionResults = null
    for (let i = 0; i < pollCount + 1; i++) {
        const geometry1 = { ...geometry }
        const polling = calculatePolling(electionResults)
        geometry1.information = { polling }
        const { castOptions } = optionsBag
        electionResults = election(geometry1, electionOptions, castOptions)
    }
    return electionResults
}
