/** @module */

import divisorGeneral from './divisorGeneral.js'

/**
 * Run the Sainte-Lague / Webster method of apportionment and return an allocation of seats.
 * @param {Object} votes
 * @param {number[]} votes.tallyFractions - tallies for each party as a fraction of 1.
 * @param {Object} socialChoiceOptions
 * @param {number} socialChoiceOptions.seats - The number of seats to fill.
 * @param {number} socialChoiceOptions.threshold - The minimum fraction of voters
 * that a party needs to be eligible for a seat.
 * @returns {{allocation:number[]}} - socialChoiceResults, with property allocation.
 * Allocation is an array of integers that say how many representatives each party gets.
 */

export default function sainteLague({ votes, socialChoiceOptions, seatLimits }) {
    const socialChoiceResults = divisorGeneral({
        votes, socialChoiceOptions, seatLimits, typeOfDivisor: 'sainteLague',
    })
    return socialChoiceResults
}
