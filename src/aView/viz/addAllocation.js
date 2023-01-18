/** @module */

/**
 * When there is just one winner,
 * sometimes the allocation isn't included in the election results.
 * So we fill the gap, for now.
 * @param {Object} electionResults
 * @returns {Object} electionResults
 */
export default function addAllocation(electionResults) {
    const { socialChoiceResults, votes } = electionResults
    const { allocation } = socialChoiceResults
    if (allocation === undefined) {
        const { tallyFractions } = votes
        const { iWinner } = socialChoiceResults
        const nk = tallyFractions.length
        const wins = Array(nk).fill(0)
        wins[iWinner] = 1
        socialChoiceResults.allocation = wins
    }
}
