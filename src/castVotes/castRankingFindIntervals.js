/** @module */

import { copyArrayShallow, range } from '../utilities/jsHelpers.js'

/**
 * Find the intervals over which voters share a ranking.
 * @param {Object[]} canGeoms
 * @constructor
 */
export default function castRankingFindIntervals(canGeoms) {
    /*
    * Find and sort midpoints for each pair of voters.
    * Find intervals in which voters have a ranking.
    * Include -Inf and Inf as interval bounds.
    * At each division, increment the borda score for the closer candidate.
    * The resulting borda score is nearly the opposite of the ranking. n-i-1.
    */

    // compute the midpoints

    const n = canGeoms.length
    const iSorted = range(n).sort((a, b) => canGeoms[a].x - canGeoms[b].x)

    const mn = 0.5 * n * (n - 1)
    const uMidpoints = Array(mn)
    const uMidpointPair = Array(mn)
    let o = 0
    for (let i = 0; i < n - 1; i++) {
        for (let k = i + 1; k < n; k++) {
            const ci = iSorted[i]
            const ck = iSorted[k]
            const midpoint = findMidpoint(canGeoms[ci], canGeoms[ck])
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

    const cansRanked = Array(mn + 1)
    for (let i = 0; i < mn + 1; i++) {
        cansRanked[i] = Array(n)
        for (let k = 0; k < n; k++) {
            cansRanked[i][k] = []
        }
        const ri = rankings[i]
        for (let k = 0; k < n; k++) {
            const rik = ri[k]
            cansRanked[i][rik - 1].push(k)
        }
    }

    // Add endpoints
    const intervalBorders = copyArrayShallow(midpoints)
    intervalBorders.unshift(-Infinity)
    intervalBorders.push(Infinity)
    return { intervalBorders, ranking: rankings, cansRanked }
}

function findMidpoint(can1, can2) {
    return (can1.x + can2.x) * 0.5
}
