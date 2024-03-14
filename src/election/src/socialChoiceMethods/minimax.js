/** @module */

import { range } from '../utilities/mathHelpers.js'
import * as typesVotes from '../types/typesVotes.js'
import * as typesSocialChoice from './typesSocialChoice.js'

/**
 * Disregard the weakest pairwise defeat until one candidate is unbeaten.
 * @param {typesVotes.votes} votes - The object for vote data.
 * @returns {typesSocialChoice.socialChoiceResults} - the results returned from a social choice function.
 */
export default function minimax(votes) {
    const { winFractionPairwise } = votes.pairwiseTallies
    const n = winFractionPairwise.length

    // make a list of number of losses
    const losses = Array(n).fill(0)
    const np = 0.5 * n * (n - 1)
    const lossDegree = Array(n)
    const loser = Array(np)
    let o = 0
    for (let i = 0; i < n - 1; i++) {
        for (let k = i + 1; k < n; k++) {
            const iOverK = winFractionPairwise[i][k] - winFractionPairwise[k][i]
            lossDegree[o] = Math.abs(iOverK)
            // add a loss for each member of the pair
            // ties go to i
            const iLost = iOverK < 0
            losses[i] += (iLost) ? 1 : 0
            losses[k] += (!iLost) ? 1 : 0
            loser[o] = (iLost) ? i : k
            o += 1
        }
    }
    // i lost to k by an amount

    // sort the losses
    const pSorted = range(np).sort((a, b) => lossDegree[a] - lossDegree[b])

    // eliminate the smallest loss until one is undefeated
    let iWinner = losses.findIndex((x) => x === 0)
    let iNext = 0 // next pair to eliminate (sorted)
    while (iWinner === -1) {
        // find the index of the next loser whose loss will be eliminated.
        const pLeast = pSorted[iNext]
        const loserLeast = loser[pLeast]
        // reduce the loss tally
        losses[loserLeast] -= 1
        // see if a candidate has no remaining losses.
        iWinner = losses.findIndex((x) => x === 0)
        iNext += 1
    }

    const socialChoiceResults = { iWinner }
    return socialChoiceResults
}

/** @constant {object} - an object: this function and descriptions of its name, input, and output */
export const minimaxMetadata = {
    name: 'Minimax',
    shortName: 'Minimax',
    functionName: 'minimax',
    voteCasterName: 'pairwise', // for input
    socialChoiceType: 'singleWinner',
    elect: minimax,
}
