/** @module */

import { sumBlock, sumGaussian } from '../plurality/castPluralityIntervals1D.js'

/**
 * Sum density of voter distributions along splits.
 */
export default function castPairwiseIntervals1D(voterGeom, geometry) {
    const { canPoints, canBorders } = geometry
    const { midpoints, iLower } = canBorders.pairwiseIntervals1D

    const nCans = canPoints.length

    const totalVotes = calcVoterTotalArea(voterGeom)

    const winsPairwise = Array(nCans).fill(0)
    for (let i = 0; i < nCans; i++) {
        winsPairwise[i] = Array(nCans).fill(0)
    }

    for (let i = 0; i < nCans - 1; i++) {
        for (let k = i + 1; k < nCans; k++) {
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
