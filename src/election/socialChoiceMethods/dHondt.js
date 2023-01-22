/** @module */

import divisorGeneral from './divisorGeneral.js'

/**
 * Run the d'Hondt / Jefferson method of apportionment and return an allocation of seats.
 * @param {Object} votes
 * @param {number[]} votes.tallyFractions - tallies for each party as a fraction of 1.
 * @param {Object} socialChoiceOptions
 * @param {number} socialChoiceOptions.seats - The number of seats to fill.
 * @param {number} socialChoiceOptions.threshold - The minimum fraction of voters
 * that a party needs to be eligible for a seat.
 * @returns {{allocation:number[]}} - socialChoiceResults, with property allocation.
 * Allocation is an array of integers that say how many representatives each party gets.
 */

export default function dHondt({ votes, socialChoiceOptions, seatLimits }) {
    const socialChoiceResults = divisorGeneral({
        votes, socialChoiceOptions, seatLimits, typeOfDivisor: 'dHondt',
    })
    return socialChoiceResults
}

/** @constant {Object} - an object: this function and descriptions of its name, input, and output */
export const dHondtMetadata = {
    name: "d'Hondt",
    shortName: "d'Hondt",
    functionName: 'dHondt',
    voteCasterName: 'plurality', // for input
    socialChoiceType: 'allocation',
}
