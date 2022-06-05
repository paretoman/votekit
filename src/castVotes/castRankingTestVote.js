import { range } from '../utilities/jsHelpers.js'

/**
 * Vote for the closest candidate.
 * @param {Objects[]} canGeoms - For 2D, an array of objects: {x,y}.
 * For 1D, an array of objects: {x}.
 * @param {Object} voterGeom - has properties x and y or just x.
 * @param {Number} dimensions
 * @returns {Number[]} Rank of each candidate
 */
export default function castRankingTestVote(canGeoms, voterGeom, dimensions) {
    const df = (dimensions === 1) ? df1 : df2
    const dist2 = canGeoms.map((c) => df(c, voterGeom))
    const n = canGeoms.length
    const indexInOrder = range(n).sort((a, b) => dist2[a] - dist2[b])

    const ranking = (new Array(n)).fill(0)
    const bordaScores = (new Array(n)).fill(0)
    for (let i = 0; i < n; i++) {
        ranking[indexInOrder[i]] = i + 1
        bordaScores[indexInOrder[i]] = n - i - 1
    }
    // Does i beat k? 1 if yes, -1 if opposite, 0 if tie
    const pairwise = new Array(n)
    for (let i = 0; i < n; i++) {
        pairwise[i] = (new Array(n)).fill(0)
        for (let k = 0; k < n; k++) {
            if (ranking[i] === ranking[k]) continue
            pairwise[i][k] = (ranking[i] < ranking[k]) ? 1 : -1
        }
    }

    return {
        indexInOrder, ranking, bordaScores, pairwise, tallyFractions: bordaScores,
    }
}
function df1(a, b) {
    return (a.x - b.x) ** 2
}
function df2(a, b) {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2
}
