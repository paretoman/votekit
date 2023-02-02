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
    const iLower = Array(n - 1)
    for (let i = 0; i < n - 1; i++) {
        midpoints[i] = Array(n - i - 1)
        iLower[i] = Array(n - i - 1)
        for (let k = i + 1; k < n; k++) {
            const ix = canGeoms[i].x
            const kx = canGeoms[k].x
            const midpoint = 0.5 * (ix + kx)
            midpoints[i][k] = midpoint
            iLower[i][k] = (ix < kx)
        }
    }

    self.sumArea = function sumArea(voterGeom) {
        // divide voterGeom

        const totalVotes = calcVoterTotalArea(voterGeom)

        const winsPairwise = Array(n).fill(0)
        for (let i = 0; i < n; i++) {
            winsPairwise[i] = Array(n).fill(0)
        }

        for (let i = 0; i < n - 1; i++) {
            for (let k = i + 1; k < n; k++) {
            // find split plane
                const lower = -Infinity
                const upper = midpoints[i][k]
                const lowerWins = sumInterval(lower, upper, voterGeom)
                const iWins = (iLower[i][k]) ? lowerWins : totalVotes - lowerWins
                const kWins = totalVotes - iWins

                winsPairwise[i][k] = iWins
                winsPairwise[k][i] = kWins
            }
        }
        return { winsPairwise, totalVotes }
    }
}

function calcVoterTotalArea(voterGeom) {
    const lower = -Infinity
    const upper = Infinity
    return sumInterval(lower, upper, voterGeom)
}

function sumInterval(lower, upper, voterGeom) {
    if (voterGeom.densityProfile === 'gaussian') {
        return sumGaussian(voterGeom, { lower, upper })
    }
    return sumBlock(voterGeom, { lower, upper })
}
