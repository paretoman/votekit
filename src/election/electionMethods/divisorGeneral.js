/** @module */

import { copyArrayShallow, range } from '../../utilities/jsHelpers.js'

/**
 * Run the Huntington-Hill method of apportionment and return an allocation of seats.
 * @param {Object} votes
 * @param {number[]} votes.tallyFractions - tallies for each party as a fraction of 1.
 * @param {Object} electionMethodOptions
 * @param {number} electionMethodOptions.seats - The number of seats to fill.
 * @param {number} electionMethodOptions.threshold - The minimum fraction of voters
 * that a party needs to be eligible for a seat.
 * @returns {{allocation:number[]}} - socialChoiceResults, with property allocation.
 * Allocation is an array of integers that say how many representatives each party gets.
 */

export default function divisorGeneral({
    votes, electionMethodOptions, typeOfDivisor, seatLimits,
}) {
    const { seats, threshold } = electionMethodOptions

    // find out how many parties pass the threshold
    let populations = votes.tallyFractions.map(
        (p) => ((p < threshold) ? 0 : p),
    )
    let positivePopulations = populations.map(
        (p) => ((p === 0) ? 0 : 1),
    )
    let nPositiveParties = positivePopulations.reduce(
        (p, c) => p + c,
    )
    let makeAdjustment = nPositiveParties === 0

    // Do we have limits to how many candidates are available in a party?
    if (seatLimits !== undefined) {
        // count how many candidates are available to fill seats
        const candidatesAvailable = positivePopulations.map(
            (p, i) => p * seatLimits[i],
        ).reduce(
            (p, c) => p + c,
        )
        if (candidatesAvailable < seats) {
            makeAdjustment = true
        }
    }

    // Make an adjustment.
    // Remove the threshold if there are no parties past the threshold.
    // Count the number of parties with positive populations.
    if (makeAdjustment) {
        populations = copyArrayShallow(votes.tallyFractions)
        positivePopulations = populations.map(
            (p) => ((p === 0) ? 0 : 1),
        )
        nPositiveParties = positivePopulations.reduce(
            (p, c) => p + c,
        )
    }

    // When there are more parties above the threshold than seats,
    // we have to give each party a seat in order
    // instead of continuing with the algorithm.
    // This is because Huntington Hill has the first signpost at 0.
    // This is just sntv.
    // Also, in the edge case where no votes are cast for any parties,
    // Just assign a default order however javascript sorts the list of presumably 0s.
    if (typeOfDivisor === 'Huntington-Hill' && (nPositiveParties > seats || nPositiveParties === 0)) {
        // sort parties by population
        // sort decreasing
        const populationsSorted = [...populations].sort(
            (a, b) => b - a,
        )
        const minPopulation = populationsSorted[seats - 1]
        const pops2 = votes.tallyFractions

        // todo: consider ties
        const allocation = pops2.map(
            (p) => ((p >= minPopulation) ? 1 : 0),
        )
        const socialChoiceResults = { allocation }
        return socialChoiceResults
    }

    // make a list of break points / divisors, independent of vote totals
    let genDivisors
    if (typeOfDivisor === 'huntingtonHill') {
        genDivisors = (_, i) => Math.sqrt((i) * (i + 1))
    } else if (typeOfDivisor === 'sainteLague') {
        genDivisors = (_, i) => i + 0.5
    } else if (typeOfDivisor === 'dHondt') {
        genDivisors = (_, i) => i + 1
    }
    const divisorPattern = Array(seats).fill().map(genDivisors)

    // Scale the divisor pattern for each party.
    // Call them signposts, like Balinski and Young.
    // Ref: Balinski and Young 1982, pages 60-66, Chapter 7, Overview of Methods.
    // Really, these are the divisors for each party.
    // They are also a ratio of the representatives to the population
    // except that the divisorPattern is used to substitute a slightly different number
    // than the number of respresentatives.

    const signposts = []
    const ids = []
    let o = 0
    for (let i = 0; i < populations.length; i++) {
        const pop = populations[i]
        if (pop === 0) continue

        const numPosts = (seatLimits === undefined) ? seats : Math.min(seatLimits[i], seats)
        for (let k = 0; k < numPosts; k++) {
            signposts[o] = divisorPattern[k] / pop
            ids[o] = i
            o += 1
        }
    }

    const doOld = false
    if (doOld) {
        return oldWay(seats, populations, signposts)
    }

    const order = range(ids.length).sort(
        (a, b) => signposts[a] - signposts[b],
    )

    const allocation = Array(populations.length).fill(0)
    for (let i = 0; i < seats; i++) {
        const iId = order[i]
        const iCan = ids[iId]
        allocation[iCan] += 1
    }

    // Todo: consider if there is a tie.
    // Right now, we give extra seats to all the tied parties if there is a tie.
    const socialChoiceResults = { allocation }
    return socialChoiceResults
}

function oldWay(seats, populations, signposts) {
    // find last signpost to fill all seats
    // sort increasing
    const sortedSignposts = signposts.sort(
        (a, b) => a - b,
    )

    const tolerance = 0.00000001 // add a little bit of tolerance for machine-accuracy
    // hopefully there will not be any exact ties.
    const lastSignpost = sortedSignposts[seats - 1] + tolerance

    // In the jargon:
    //   Divide by populations by the divisors to get the quotients.
    // Or, more clearly:
    //   Count how many signposts each party has passed.

    // lastSignpost = d/p
    // d = p * lastSignpost
    // sqrt(i*(i+1)) = d
    // i=0 is one seat
    // n = i + 1
    // sqrt(n*(n-1)) = d
    // n**2 - n = d**2
    // n = (-b + sqrt(b-4ac) ) / 2a
    // a = 1, b = -1, c = -d**2
    // n = (1 + sqrt(1+4d**2) ) / 2
    const quotients = populations.map(
        (p) => ((p === 0) ? 0 : (1 + Math.sqrt(1 + 4 * (p * lastSignpost) ** 2)) * 0.5),
    )
    const allocation = quotients.map(
        (p) => Math.floor(p),
    )
    const socialChoiceResults = { allocation }
    return socialChoiceResults
}
