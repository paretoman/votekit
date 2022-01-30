export default function huntingtonHill(votes, electionMethodOptions) {
    // Run the Huntington-Hill method of apportionment and return an allocation of seats.

    const { seats, threshold } = electionMethodOptions

    const populations = votes.tallyFractions.map(
        (p) => ((p < threshold) ? 0 : p),
    )

    const nparties = populations.length

    // When the threshold is 0, we have to give each party a seat.
    if (threshold === 0 && nparties > seats) {
        // sort parties by population
        // sort decreasing
        const populationsSorted = [...populations].sort(
            (a, b) => b - a,
        )
        const minPopulation = populationsSorted[seats - 1]
        const pops2 = votes.tallyFractions

        // todo: consider ties
        const allocation = pops2.map(
            (p) => p >= minPopulation,
        )
        return allocation
    }

    // make a list of break points / divisors, independent of vote totals
    const divisorPattern = Array(nparties).fill().map(
        (_, i) => Math.sqrt((i) * (i + 1)),
    )

    // Scale the divisor pattern for each party.
    // Call them signposts, like Balinski and Young.
    // Ref: Balinski and Young 1982, pages 60-66, Chapter 7, Overview of Methods.
    // Really, these are the divisors for each party.
    // They are also a ratio of the representatives to the population
    // except that the divisorPattern is used to substitute a slightly different number
    // than the number of respresentatives.
    const signposts = populations.map(
        (p) => (p === 0 ? [] : divisorPattern.map((d) => d / p)),
    ).flat()

    // find last signpost to fill all seats
    // sort increasing
    const sortedSignposts = signposts.flat().sort(
        (a, b) => a - b,
    )

    const lastSignpost = sortedSignposts[seats - 1]

    // In the jargon:
    //   Divide by populations by the divisors to get the quotients.
    // Or, more clearly:
    //   Count how many signposts each party has passed.

    // lastSignpost = d/p
    // d = p * lastSignpost
    // sqrt(i*(i+1)) = d
    // i=0 is one seat
    // i**2 + i = d**2
    // i = -b + sqrt(b-4ac) / 2a
    // a = 1, b = 1, c = -d**2
    // i = (-1 + sqrt(1+4d**2) ) / 2
    const quotients = populations.map(
        (p) => (-1 + Math.sqrt(1 + 4 * (p * lastSignpost) ** 2)) * 0.5,
    )
    const allocation = quotients.map(
        (p) => Math.floor(p) + 1,
    )

    // Todo: consider if there is a tie.
    // Right now, we give extra seats to all the tied parties if there is a tie.

    const results = { allocation }
    return results
}
