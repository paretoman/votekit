/** @module */

import { normPDF, range } from '../utilities/jsHelpers.js'
import castScoreTestVote from './castScoreTestVote.js'

/**
 * Sum area of voter distributions to tally the votes.
 * @param {Candidate[]} cans
 * @constructor
 */
export default function CastScoreAreaSummer(cans, optionCast) {
    const self = this

    self.sumArea = function sumArea(voterGeom) {
        // just find the vote at each grid point and weight according to type
        const grid = makeGrid(voterGeom, optionCast)

        const n = cans.length
        const area = Array(n).fill(0)
        let totalArea = 0

        // find vote
        const gridLength = grid.x.length
        const voteSet = Array(gridLength)
        for (let i = 0; i < gridLength; i++) {
            const weight = grid.weight[i]
            // if (weight === 0) continue
            const xi = grid.x[i]
            const yi = grid.y[i]
            const testVoter = { x: xi, y: yi }
            const tallyFractions = castScoreTestVote(cans, testVoter, 2)
            voteSet[i] = { tallyFractions }
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

function makeGrid(voterGeom, optionCast) {
    const isGauss = voterGeom.densityProfile === 'gaussian'
    const spread = (isGauss) ? 3 : 1
    const { x, y, w } = voterGeom

    const width = w * spread
    const { usr } = optionCast // undersampling ratio
    const iWidth = Math.round(width / usr)

    // TODO: sample from middle of square
    const ixGrid = range(iWidth)
    const iyGrid = range(iWidth)
    const gridXMargin = ixGrid.map((i) => (i + 0.5) * usr - width * 0.5 + x)
    const gridYMargin = iyGrid.map((i) => (i + 0.5) * usr - width * 0.5 + y)

    const nx = ixGrid.length
    const ny = iyGrid.length
    const gridLength = nx * ny
    const gridX = Array(gridLength)
    const gridY = Array(gridLength)
    const weight = Array(gridLength)
    let i = 0
    for (let iy = 0; iy < iyGrid.length; iy++) {
        for (let ix = 0; ix < ixGrid.length; ix++) {
            const gx = gridXMargin[ix]
            const gy = gridYMargin[iy]
            gridX[i] = gx
            gridY[i] = gy
            weight[i] = findWeight(voterGeom, gx, gy)
            i += 1
        }
    }

    const grid = {
        x: gridX, y: gridY, weight, nx, ny,
    }
    return grid
}

function findWeight(voterGeom, gx, gy) {
    // need to cut away circle

    const isGauss = voterGeom.densityProfile === 'gaussian'

    const { x, y, w } = voterGeom
    if (!isGauss) {
        const d2 = (gx - x) ** 2 + (gy - y) ** 2
        const r2 = (0.5 * w) ** 2
        // TODO: for edges, determine how much of the area of the pixel is within the shape.
        if (d2 < r2) {
            return 1
        }
        return 0

        // const weight = (d2 < r2) ? 1 : 0
        // return weight
    }
    // w = sigma * sqrt(2*pi)
    const sigma = w / Math.sqrt(2 * Math.PI)
    // TODO: is this pdf multiplication correct? Does sigma need to be modified?
    const weight = w * normPDF(gx, x, sigma) * normPDF(gy, y, sigma)
    return weight
}
