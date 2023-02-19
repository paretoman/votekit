/** @module */

import divisorGeneral from './divisorGeneral.js'

/**
 * Run the Huntington-Hill method of apportionment and return an allocation of seats.
 * @param {object} votes
 * @param {object} votes.candidateTallies - vote tallies indexed by candidate
 * @param {number[]} votes.candidateTallies.voteFractionsByCan - The fraction of plurality votes for each candidate.
 * @param {object} socialChoiceOptions
 * @param {number} socialChoiceOptions.seats - The number of seats to fill.
 * @param {number} socialChoiceOptions.threshold - The minimum fraction of voters
 * that a party needs to be eligible for a seat.
 * @returns {{allocation:number[]}} - socialChoiceResults, with property allocation.
 * Allocation is an array of integers that say how many representatives each party gets.
 */

export default function huntingtonHill(votes, socialChoiceOptions) {
    const typeOfDivisor = 'huntingtonHill'
    const socialChoiceResults = divisorGeneral(votes, socialChoiceOptions, typeOfDivisor)

    return socialChoiceResults
}

/** @constant {object} - an object: this function and descriptions of its name, input, and output */
export const huntingtonHillMetadata = {
    name: 'Huntington Hill',
    shortName: 'Huntington',
    functionName: 'huntingtonHill',
    voteCasterName: 'plurality', // for input
    socialChoiceType: 'allocation', // for output
    elect: huntingtonHill,
}
