/** @module */

import getTallyFractions from './getTallyFractions.js'

/**
 * When there is just one winner,
 * sometimes the allocation isn't included in the election results.
 * @param {Object} electionResults
 * @returns {Object} allocation
 */
export default function getAllocation(electionResults) {
    const { socialChoiceResults, votes } = electionResults
    const { allocation } = socialChoiceResults
    if (allocation !== undefined) {
        return allocation
    }

    // else
    const tallyFractions = getTallyFractions(votes)
    const { iWinner } = socialChoiceResults
    const nk = tallyFractions.length
    const wins = Array(nk).fill(0)
    wins[iWinner] = 1
    return wins
}
