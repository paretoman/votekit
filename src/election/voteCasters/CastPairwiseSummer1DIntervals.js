/** @module */

import { sumBlock, sumGaussian } from './CastPluralitySummer1DIntervals.js'
/**
 * Sum density of voter distributions along splits.
 * @param {Object[]} canGeoms
 * @constructor
 */
export default function CastPairwiseSummer1DIntervals(canGeoms) {
    const self = this

    // compute the midpoints
    // identify which candidate is smaller in x value

    const n = canGeoms.length

    const midpoints = Array(n - 1)
    const iSmaller = Array(n - 1)
    for (let i = 0; i < n - 1; i++) {
        midpoints[i] = Array(n - i - 1)
        iSmaller[i] = Array(n - i - 1)
        for (let k = i + 1; k < n; k++) {
            const ix = canGeoms[i].x
            const kx = canGeoms[k].x
            const midpoint = 0.5 * (ix + kx)
            midpoints[i][k] = midpoint
            iSmaller[i][k] = (ix < kx)
        }
    }

    self.sumArea = function sumArea(voterGeom, weight) {
        // divide voterGeom

        const totalArea = calcVoterTotalArea(voterGeom, weight)

        const area = Array(n).fill(0)
        for (let i = 0; i < n; i++) {
            area[i] = Array(n).fill(0)
        }

        for (let i = 0; i < n - 1; i++) {
            for (let k = i + 1; k < n; k++) {
            // find split plane
                const lower = -Infinity
                const upper = midpoints[i][k]
                const smallerArea = sumInterval(lower, upper, voterGeom) * weight
                const iArea = (iSmaller[i][k]) ? smallerArea : totalArea - smallerArea
                const kArea = totalArea - iArea

                area[i][k] = iArea
                area[k][i] = kArea
            }
        }
        return { area, totalArea }
    }
}

function calcVoterTotalArea(voterGeom, weight) {
    const lower = -Infinity
    const upper = Infinity
    return sumInterval(lower, upper, voterGeom) * weight
}

function sumInterval(lower, upper, voterGeom) {
    if (voterGeom.densityProfile === 'gaussian') {
        return sumGaussian(voterGeom, { lower, upper })
    }
    return sumBlock(voterGeom, { lower, upper })
}
