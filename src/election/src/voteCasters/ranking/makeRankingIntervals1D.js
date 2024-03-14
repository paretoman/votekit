/** @module */

import { copyArrayShallow, range } from '@paretoman/votekit-utilities'

/**
 * Find the intervals over which voters share a ranking.
 * @param {number[]} canPoints
 */
export default function makeRankingIntervals1D(canPoints) {
    /*
    * Find and sort midpoints for each pair of voters.
    * Find intervals in which voters have a ranking.
    * Include -Inf and Inf as interval bounds.
    * At each division, increment the borda score for the closer candidate.
    * The resulting borda score is nearly the opposite of the ranking. n-i-1.
    */

    // compute the midpoints

    const n = canPoints.length
    const iSorted = range(n).sort((a, b) => canPoints[a] - canPoints[b])

    const mn = 0.5 * n * (n - 1)
    const uMidpoints = Array(mn)
    const uMidpointPair = Array(mn)
    let o = 0
    for (let i = 0; i < n - 1; i++) {
        for (let k = i + 1; k < n; k++) {
            const ci = iSorted[i]
            const ck = iSorted[k]
            const midpoint = findMidpoint(canPoints[ci], canPoints[ck])
            uMidpoints[o] = midpoint
            uMidpointPair[o] = [ci, ck]
            o += 1
        }
    }

    // sort the midpoints
    const mSorted = range(mn).sort((a, b) => uMidpoints[a] - uMidpoints[b])
    const midpoints = mSorted.map((i) => uMidpoints[i])
    const midpointPair = mSorted.map((i) => uMidpointPair[i])

    // compute ranking at lower side
    const ranking = Array(n)
    for (let i = 0; i < n; i++) {
        ranking[iSorted[i]] = i + 1
    }

    // compute all rankings

    const rankings = Array(mn + 1)
    rankings[0] = copyArrayShallow(ranking)
    for (let i = 0; i < mn; i++) {
        const [ci, ck] = midpointPair[i]
        ranking[ci] += 1
        ranking[ck] -= 1
        rankings[i + 1] = copyArrayShallow(ranking)
    }

    const cansByRankList = Array(mn + 1)
    for (let i = 0; i < mn + 1; i++) {
        cansByRankList[i] = Array(n)
        for (let k = 0; k < n; k++) {
            cansByRankList[i][k] = []
        }
        const ri = rankings[i]
        for (let k = 0; k < n; k++) {
            const rik = ri[k]
            cansByRankList[i][rik - 1].push(k)
        }
    }

    // Add endpoints
    const intervalBorders = copyArrayShallow(midpoints)
    intervalBorders.unshift(-Infinity)
    intervalBorders.push(Infinity)
    const rankingIntervals1D = { intervalBorders, rankings, cansByRankList }
    return rankingIntervals1D
}

function findMidpoint(can1, can2) {
    return (can1 + can2) * 0.5
}
