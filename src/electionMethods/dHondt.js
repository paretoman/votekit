/** @module */

import divisorGeneral from './divisorGeneral.js'

/**
 * Run the d'Hondt / Jefferson method of apportionment and return an allocation of seats.
 * @param {Object} votes
 * @param {number[]} votes.tallyFractions - tallies for each party as a fraction of 1.
 * @param {Object} electionMethodOptions
 * @param {number} electionMethodOptions.seats - The number of seats to fill.
 * @param {number} electionMethodOptions.threshold - The minimum fraction of voters
 * that a party needs to be eligible for a seat.
 * @returns {{allocation:number[]}} - socialChoiceResults, with property allocation.
 * Allocation is an array of integers that say how many representatives each party gets.
 */

export default function dHondt({ votes, electionMethodOptions }) {
    const socialChoiceResults = divisorGeneral({ votes, electionMethodOptions, typeOfDivisor: 'dHondt' })
    return socialChoiceResults
}
