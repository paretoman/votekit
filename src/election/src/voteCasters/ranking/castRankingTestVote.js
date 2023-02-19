/** @module */

import { range } from '../../election/mathHelpers.js'
import * as typesVote from '../types/typesVote.js'
/**
 * Vote for the closest candidate.
 * @returns {typesVote.rankingVote}
 */
export default function castRankingTestVote({ canGeoms, voterPoint, dimensions }) {
    const df = (dimensions === 1) ? df1 : df2
    const dist2 = canGeoms.map((c) => df(c, voterPoint))
    const n = canGeoms.length
    const indexInOrder = range(n).sort((a, b) => dist2[a] - dist2[b])
    // Note that ties are not handled.

    const ranking = new Array(n)
    const bordaScores = new Array(n)
    const bordaFractions = new Array(n)
    for (let i = 0; i < n; i++) {
        ranking[indexInOrder[i]] = i + 1
        bordaScores[indexInOrder[i]] = n - i - 1
        bordaFractions[indexInOrder[i]] = (n - i - 1) / (n - 1)
    }
    // Does i beat k? 1 if yes, -1 if opposite, 0 if tie
    const netWinsPairwise = new Array(n)
    for (let i = 0; i < n; i++) {
        netWinsPairwise[i] = (new Array(n)).fill(0)
        for (let k = 0; k < n; k++) {
            if (ranking[i] === ranking[k]) continue
            netWinsPairwise[i][k] = (ranking[i] < ranking[k]) ? 1 : -1
        }
    }

    return {
        indexInOrder, ranking, netWinsPairwise, bordaFractions, bordaScores,
    }
}
function df1(a, b) {
    return (a.x - b.x) ** 2
}
function df2(a, b) {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2
}
