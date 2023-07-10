/** @module */

import getTallyFractions from './getTallyFractions.js'

/**
 * When there is just one winner,
 * sometimes the allocation isn't included in the election results.
 * So we fill the gap, for now.
 * @param {Object} sequenceResults
 * @returns {Object} sequenceResults
 */
export default function addAllocation(sequenceResults) {
    const { socialChoiceResults, votes } = sequenceResults
    const { allocation } = socialChoiceResults
    if (allocation === undefined) {
        const tallyFractions = getTallyFractions(votes)
        const { iWinner } = socialChoiceResults
        const nk = tallyFractions.length
        const wins = Array(nk).fill(0)
        wins[iWinner] = 1
        socialChoiceResults.allocation = wins
    }
}
