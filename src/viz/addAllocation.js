/** @module */

/**
 * When there is just one winner,
 * sometimes the allocation isn't included in the election results.
 * So we fill the gap, for now.
 * @param {Object} electionResults
 * @returns {Object} electionResults
 */
export default function addAllocation(electionResults) {
    const { allocation, votes } = electionResults
    const { tallyFractions } = votes
    if (allocation === undefined) {
        const nk = tallyFractions.length
        const wins = Array(nk).fill(0)
        wins[electionResults.iWinner] = 1

        return { tallyFractions, allocation: wins }
    }
    return { tallyFractions, allocation }
}
