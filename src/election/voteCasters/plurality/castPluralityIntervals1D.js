/** @module */

import { normCDF } from '../../../utilities/jsHelpers.js'

/**
 * Sum area under voter distributions to tally the votes.
 */
export default function castPluralityIntervals1D(voterGeom, geometry) {
    const { canGeoms, canBorders } = geometry
    const intervals = canBorders.voronoiIntervals1D

    const sum = (voterGeom.densityProfile === 'gaussian') ? sumGaussian : sumBlock

    // return sum for each candidate
    const n = canGeoms.length
    const countByCan = Array(n)
    let totalVotes = 0
    for (let i = 0; i < n; i++) {
        const voteCount = sum(voterGeom, intervals[i])
        countByCan[i] = voteCount
        totalVotes += voteCount
    }
    return { countByCan, totalVotes }
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
