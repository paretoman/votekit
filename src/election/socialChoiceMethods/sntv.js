/** @module */

import { range } from '../../utilities/jsHelpers.js'

/**
 * Single Transferable Vote
 * @param {Object} votes
 * @param {Number[]} votes.tallyFractions - A list of fractions of voters
 * who picked a candidate, indexed by candidate.
 * @param {Object} socialChoiceOptions
 * @param {number} socialChoiceOptions.seats - The number of seats to fill.
 * @returns {{allocation:number[]}} - A variable "socialChoiceResults",
 * with the property "allocation".
 * Allocation is an array of integers that say whether a candidate is elected (1) or not (0).
 */
export default function sntv({ votes, socialChoiceOptions }) {
    const { tallyFractions } = votes.candidateTallies
    const { seats } = socialChoiceOptions

    const nk = tallyFractions.length

    if (seats >= nk) {
        // more seats than candidates, so elect all candidates
        const allocation = Array(nk).fill(1)
        const socialChoiceResults = { allocation }
        return socialChoiceResults
    }

    // sort descending
    const cansSorted = range(nk).sort((a, b) => tallyFractions[b] - tallyFractions[a])

    const allocation = Array(nk).fill(0)
    for (let r = 0; r < seats; r++) { // TODO: handle edge cases, like ties or zeros
        const canI = cansSorted[r]
        allocation[canI] = 1
    }
    const socialChoiceResults = { allocation }
    return socialChoiceResults
}
