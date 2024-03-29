/** @module */
import { range } from '@paretoman/votekit-utilities'
import * as types from '@paretoman/votekit-types'
/**
 * Vote for the closest candidate.
 * @returns {types.typesVote.pairwiseVote}
 */
export default function castPairwisePoint(canPoints, voterPoint, dimensions, verbosity) {
    const d2f = (dimensions === 1) ? d2f1 : d2f2

    const n = canPoints.length
    const dist2 = Array(n)
    for (let i = 0; i < n; i++) {
        dist2[i] = d2f(canPoints[i], voterPoint)
    }

    // Does i beat k? 1 if yes, -1 if opposite, 0 if tie
    const netWinsPairwise = Array(n)
    for (let i = 0; i < n; i++) {
        netWinsPairwise[i] = Array(n).fill(0)
        for (let k = 0; k < n; k++) {
            if (dist2[i] === dist2[k]) continue
            netWinsPairwise[i][k] = (dist2[i] < dist2[k]) ? 1 : -1
        }
    }

    if (verbosity === 0) return { netWinsPairwise }

    const indexInOrder = range(n).sort((a, b) => dist2[a] - dist2[b])
    // Note that ties are not handled.

    const ranking = Array(n)
    const bordaScores = Array(n)
    const bordaFractions = Array(n)
    const cansByRank = Array(n)
    for (let i = 0; i < n; i++) {
        const can = indexInOrder[i]
        ranking[can] = i + 1
        bordaScores[can] = n - i - 1
        bordaFractions[can] = (n - i - 1) / (n - 1)
        cansByRank[i] = [can]
    }

    return {
        cansByRank, ranking, netWinsPairwise, bordaFractions, bordaScores,
    }
}
function d2f1(a, b) {
    return (a - b) ** 2
}
function d2f2(a, b) {
    return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2
}
