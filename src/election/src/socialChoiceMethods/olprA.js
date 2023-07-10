/** @module */

import { range } from '../util/mathHelpers.js'
import sainteLague from './sainteLague.js'
import sntv from './sntv.js'
import * as typesVotes from '../voteCasters/types/typesVotes.js'
import * as typesSocialChoice from './typesSocialChoice.js'

/**
 * Run an Open List Proportional Representation method. Call this variant by the name "A".
 * Return a list of winning candidates and a list of allocated seats to parties.
 * A voter votes for a candidate. Party lists help candidates pool their votes.
 * Party lists are allocated seats. The most popular candidates in a party are elected.
 * @param {typesVotes.votes} votes - The object for vote data.
 * @param {typesSocialChoice.socialChoiceOptions} socialChoiceOptions - options to specify a social choice function.
 * @returns {typesSocialChoice.socialChoiceResults} - the results returned from a social choice function.
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
    const votes3 = { candidateTallies: { voteFractionsByCan: partyVotes }, numCans }
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
        const votes2 = { candidateTallies: { voteFractionsByCan: fractionTfWithinParty }, numCans }
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

/** @constant {object} - an object: this function and descriptions of its name, input, and output */
export const olprAMetadata = {
    name: 'Open List Proportional Representation',
    shortName: 'OLPR A',
    functionName: 'olprA',
    voteCasterName: 'plurality', // for input
    socialChoiceType: 'multiWinner',
    elect: olprA,
}
