/** @module */

import { range } from '../election/mathHelpers.js'
import sainteLague from './sainteLague.js'
import sntv from './sntv.js'

/**
 * Run an Open List Proportional Representation method. Call this variant by the name "A".
 * Return a list of winning candidates and a list of allocated seats to parties.
 * A voter votes for a candidate. Party lists help candidates pool their votes.
 * Party lists are allocated seats. The most popular candidates in a party are elected.
 * @param {Object} votes
 * @param {Object} votes.candidateTallies - vote tallies indexed by candidate
 * @param {Number[]} votes.candidateTallies.voteFractionsByCan - The fraction of plurality votes for each candidate.
 * @param {Object} socialChoiceOptions
 * @param {number} socialChoiceOptions.seats - The number of seats to fill.
 * @param {number} socialChoiceOptions.threshold - The minimum fraction of voters
 * that a party needs to be eligible for a seat.
 * @returns {{allocation:number[]}} - A variable "socialChoiceResults",
 * with the property "allocation".
 * Allocation is an array of integers that say whether a candidate is elected (1) or not (0).
 */

export default function olprA(votes, socialChoiceOptions) {
    // Make a tally for each party.

    // TODO: provide these variables in votes
    const { voteFractionsByCan } = votes.candidateTallies
    const { parties } = votes
    const { partiesByCan, numParties } = parties
    const numCans = voteFractionsByCan.length
    const partyVotes = Array(numParties).fill(0)
    const seatLimits = Array(numParties).fill(0)
    for (let i = 0; i < numCans; i++) {
        // Find which party the candidate belongs to - index of party.
        const iParty = partiesByCan[i]
        // Add tally to party.
        partyVotes[iParty] += voteFractionsByCan[i]
        seatLimits[iParty] += 1
    }

    // Find out how many seats each party gets.
    // todo: change method
    const socialChoiceOptions3 = { ...socialChoiceOptions }
    socialChoiceOptions3.seatLimits = seatLimits
    const votes3 = { candidateTallies: { voteFractionsByCan: partyVotes } }
    const partyResults = sainteLague(votes3, socialChoiceOptions3)
    const partyAllocation = partyResults.allocation

    // Which candidates get the seats?
    // Find the highest-scoring candidates.
    const allocation = Array(numCans).fill(0)
    for (let i = 0; i < numParties; i++) {
        // Set inputs for SNTV.
        const socialChoiceOptions2 = { seats: partyAllocation[i] }
        const cansInParty = range(numCans).filter((k) => partiesByCan[k] === i)
        const tfWithinParty = cansInParty.map((k) => voteFractionsByCan[k])
        const totalTFInParty = tfWithinParty.reduce((p, c) => p + c, 0)
        const fractionTfWithinParty = tfWithinParty.map((x) => x / totalTFInParty)
        // Run sntv.
        const votes2 = { candidateTallies: { voteFractionsByCan: fractionTfWithinParty } }
        const socialChoiceInParty = sntv(votes2, socialChoiceOptions2)
        const allocationInParty = socialChoiceInParty.allocation
        // Store sntv results in allocation list for all candidates.
        for (let k = 0; k < cansInParty.length; k++) {
            const iCan = cansInParty[k]
            allocation[iCan] = allocationInParty[k]
        }
    }

    // Todo: consider if there is a tie.
    const socialChoiceResults = { allocation }
    return socialChoiceResults
}

/** @constant {Object} - an object: this function and descriptions of its name, input, and output */
export const olprAMetadata = {
    name: 'Open List Proportional Representation',
    shortName: 'OLPR A',
    functionName: 'olprA',
    voteCasterName: 'plurality', // for input
    socialChoiceType: 'multiWinner',
    elect: olprA,
}
