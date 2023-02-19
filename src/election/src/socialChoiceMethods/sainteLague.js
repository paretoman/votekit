/** @module */

import divisorGeneral from './divisorGeneral.js'

/**
 * Run the Sainte-Lague / Webster method of apportionment and return an allocation of seats.
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

export default function sainteLague(votes, socialChoiceOptions) {
    const typeOfDivisor = 'sainteLague'
    const socialChoiceResults = divisorGeneral(votes, socialChoiceOptions, typeOfDivisor)
    return socialChoiceResults
}

/** @constant {object} - an object: this function and descriptions of its name, input, and output */
export const sainteLagueMetadata = {
    name: 'Sainte-Lague',
    shortName: 'Sainte-Lague',
    functionName: 'sainteLague',
    voteCasterName: 'plurality', // for input
    socialChoiceType: 'allocation',
    elect: sainteLague,
}
