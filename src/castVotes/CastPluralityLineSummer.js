/** @module */

import { range, normCDF } from '../utilities/jsHelpers.js'

/**
 * Sum area of voter distributions to tally the votes.
 * @param {Object[]} cans - position of each candidate {x}
 * @constructor
 */
export default function LineSummer(cans) {
    const self = this

    const intervals = findIntervals(cans)

    self.sumArea = function sumArea(voterGroup) {
        const n = cans.length
        const area = Array(n)
        // return sum for each candidate
        if (voterGroup.densityProfile === 'gaussian') {
            for (let i = 0; i < n; i++) {
                area[i] = sumGaussian(voterGroup, intervals[i])
            }
        } else {
            for (let i = 0; i < n; i++) {
                area[i] = sumBlock(voterGroup, intervals[i])
            }
        }
        return area
    }
}

/** Find boundary between candidates */
function findIntervals(cans) {
    const n = cans.length
    const iSorted = range(n).sort((a, b) => cans[a].x - cans[b].x)
    const midpoints = new Array(n - 1)
    for (let i = 0; i < n - 1; i++) {
        midpoints[i] = (cans[iSorted[i]].x + cans[iSorted[i + 1]].x) * 0.5
    }
    const intervals = new Array(n)
    for (let i = 0; i < n; i++) {
        const lower = (i === 0) ? -Infinity : midpoints[i - 1]
        const upper = (i === n - 1) ? Infinity : midpoints[i]
        intervals[iSorted[i]] = { lower, upper }
    }

    return intervals
}

function sumBlock(block, interval) {
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

function sumGaussian(block, interval) {
    const { lower, upper } = interval
    const { x, w } = block
    const center = x
    const sigma = w / Math.sqrt(2 * Math.PI) // w = sigma * sqrt(2*pi)
    // evaluate integral of gaussian on interval
    const sum = w * normCDF(upper, center, sigma) - w * normCDF(lower, center, sigma)

    return sum
}
