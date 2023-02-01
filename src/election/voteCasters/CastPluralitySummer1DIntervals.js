/** @module */

import { range, normCDF } from '../../utilities/jsHelpers.js'

/**
 * Sum area under voter distributions to tally the votes.
 * @param {Object[]} canGeoms - position of each candidate {x}
 * @constructor
 */
export default function LineSummer(canGeoms) {
    const self = this

    const intervals = findIntervals(canGeoms)

    self.sumArea = function sumArea(voterGeom) {
        const sum = (voterGeom.densityProfile === 'gaussian') ? sumGaussian : sumBlock

        // return sum for each candidate
        const n = canGeoms.length
        const countByCan = Array(n)
        let totalCount = 0
        for (let i = 0; i < n; i++) {
            const voteCount = sum(voterGeom, intervals[i])
            countByCan[i] = voteCount
            totalCount += voteCount
        }
        return { countByCan, totalCount }
    }
}

/** Find boundary between candidates */
function findIntervals(canGeoms) {
    const n = canGeoms.length
    const iSorted = range(n).sort((a, b) => canGeoms[a].x - canGeoms[b].x)
    const midpoints = new Array(n - 1)
    for (let i = 0; i < n - 1; i++) {
        midpoints[i] = (canGeoms[iSorted[i]].x + canGeoms[iSorted[i + 1]].x) * 0.5
    }
    const intervals = new Array(n)
    for (let i = 0; i < n; i++) {
        const lower = (i === 0) ? -Infinity : midpoints[i - 1]
        const upper = (i === n - 1) ? Infinity : midpoints[i]
        intervals[iSorted[i]] = { lower, upper }
    }

    return intervals
}

export function sumBlock(block, interval) {
    const { lower, upper } = interval
    const { x, w } = block
    const r = 0.5 * w
    const lower2 = x - r
    const upper2 = x + r
    const lower3 = Math.max(lower, lower2)
    const upper3 = Math.min(upper, upper2)
    const sum = Math.max(0, upper3 - lower3)
    return sum
}

export function sumGaussian(block, interval) {
    const { lower, upper } = interval
    const { x, w } = block
    const center = x
    const sigma = w / Math.sqrt(2 * Math.PI) // w = sigma * sqrt(2*pi)
    // evaluate integral of gaussian on interval
    const sum = w * normCDF(upper, center, sigma) - w * normCDF(lower, center, sigma)

    return sum
}
