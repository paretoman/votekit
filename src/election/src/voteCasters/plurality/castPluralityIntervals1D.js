/** @module */

import { normCDF } from '../../utilities/mathHelpers.js'
import * as typesVotesForGeom from '../../types/typesVotesForGeom.js'
/**
 * Sum area under voter distributions to tally the votes.
 * @returns {typesVotesForGeom.votesForGeomPlurality}
 */
export default function castPluralityIntervals1D(voterGeom, geometry) {
    const { canPoints, canBorders } = geometry
    const intervals = canBorders.voronoiIntervals1D

    const sum = (voterGeom.densityProfile === 'gaussian') ? sumGaussian : sumBlock

    // return sum for each candidate
    const n = canPoints.length
    const countByCan = Array(n)
    let totalVotes = 0
    for (let i = 0; i < n; i++) {
        const voteCount = sum(voterGeom, intervals[i])
        countByCan[i] = voteCount
        totalVotes += voteCount
    }
    return { countByCan, totalVotes }
}

export function sumBlock(voterGeom, interval) {
    const { lower, upper } = interval
    const { x, w, densityMax } = voterGeom
    const r = 0.5 * w
    const lower2 = x - r
    const upper2 = x + r
    const lower3 = Math.max(lower, lower2)
    const upper3 = Math.min(upper, upper2)
    const sum = Math.max(0, upper3 - lower3) * densityMax
    return sum
}

export function sumGaussian(voterGeom, interval) {
    const { lower, upper } = interval
    const { x, w, densityMax } = voterGeom
    const center = x
    const sigma = w / Math.sqrt(2 * Math.PI) // w = sigma * sqrt(2*pi)
    // evaluate integral of gaussian on interval
    const sum = w * (normCDF(upper, center, sigma) - normCDF(lower, center, sigma)) * densityMax

    return sum
}
