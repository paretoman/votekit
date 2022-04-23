/** @module */

import { range, normPDF } from '../utilities/jsHelpers.js'
import castScoreTestVote from './castScoreTestVote.js'

/**
 * Sum area of voter distributions to tally the votes.
 * @param {Object[]} cans - position of each candidate {x}
 * @constructor
 */
export default function CastScoreLineSummer(cans) {
    const self = this

    self.sumArea = function sumArea(voterGroup) {
        // just find the vote at each grid point and weight according to type
        const grid = makeGrid(voterGroup)

        const n = cans.length
        const area = Array(n).fill(0)
        let totalArea = 0

        // find vote
        const gridLength = grid.x.length
        const voteSet = Array(gridLength)
        for (let i = 0; i < gridLength; i++) {
            const xi = grid.x[i]
            const testVoter = { x: xi }
            const tallyFractions = castScoreTestVote(cans, testVoter, 1)
            voteSet[i] = { tallyFractions }
            const weight = findWeight(voterGroup, xi)
            totalArea += weight
            for (let k = 0; k < n; k++) {
                area[k] += tallyFractions[k] * weight
            }
        }
        return {
            grid, voteSet, area, totalArea,
        }
    }
}

function makeGrid(voterGroup) {
    const isGauss = voterGroup.densityProfile === 'gaussian'
    const spread = (isGauss) ? 3 : 1
    const { x, w } = voterGroup
    const iWidth = w * spread
    const iGrid = range(iWidth)
    const gridX = iGrid.map((i) => i + 0.5 - iWidth * 0.5 + x)
    const grid = { x: gridX }
    return grid
}

function findWeight(voterGroup, xi) {
    const isGauss = voterGroup.densityProfile === 'gaussian'
    if (!isGauss) {
        return 1
    }
    const { x, w } = voterGroup
    const center = x
    const sigma = w / Math.sqrt(2 * Math.PI) // w = sigma * sqrt(2*pi)
    const weight = w * normPDF(xi, center, sigma)
    return weight
}
