/** @module */

import { normPDF, range } from '../../utilities/jsHelpers.js'
import castScoreTestVote from './castScoreTestVote.js'

/**
 * Sum area of voter distributions to tally the votes.
 * @param {Object[]} canGeoms
 * @constructor
 */
export default function CastScoreSummer2DGrid(canGeoms, castOptions) {
    const self = this

    self.sumArea = function sumArea(voterGeom) {
        // just find the vote at each grid point and weight according to type
        const grid = makeGrid(voterGeom, castOptions)

        const n = canGeoms.length
        const area = Array(n).fill(0)
        let totalArea = 0

        // find vote
        const gridLength = grid.x.length
        const voteSet = Array(gridLength)
        const weightSet = grid.weight
        for (let i = 0; i < gridLength; i++) {
            const weight = grid.weight[i]
            // if (weight === 0) continue
            const xi = grid.x[i]
            const yi = grid.y[i]
            const testVoter = { x: xi, y: yi }
            const vote = castScoreTestVote({ canGeoms, voterGeom: testVoter, dimensions: 2 })
            voteSet[i] = vote
            const { tallyFractions } = vote
            totalArea += weight
            for (let k = 0; k < n; k++) {
                area[k] += tallyFractions[k] * weight
            }
        }
        return {
            grid, voteSet, area, totalArea, weightSet,
        }
    }
}

const invSqrt8 = 1 / Math.sqrt(8)

function makeGrid(voterGeom, castOptions) {
    const { x, y, w, densityProfile } = voterGeom
    const isGauss = densityProfile === 'gaussian'
    const spread = (isGauss) ? 3 : 1

    const width = w * spread
    const { usr } = castOptions // undersampling ratio
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

    const invNorm = (isGauss) ? 1 / normPDF(0, 0, w * invSqrt8) : 1

    for (let iy = 0; iy < iyGrid.length; iy++) {
        for (let ix = 0; ix < ixGrid.length; ix++) {
            const gx = gridXMargin[ix]
            const gy = gridYMargin[iy]
            gridX[i] = gx
            gridY[i] = gy
            weight[i] = findWeight(voterGeom, gx, gy, invNorm)
            i += 1
        }
    }

    const grid = {
        x: gridX, y: gridY, weight, nx, ny, width,
    }
    return grid
}

function findWeight(voterGeom, gx, gy, invNorm) {
    // need to cut away circle

    const { x, y, w, densityProfile } = voterGeom

    const isGauss = densityProfile === 'gaussian'
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

    // To compare a circle to a 2D normal distribution,
    // set the circle's density to the normal's density at 0.
    // Then the radius R of the circle is related to sigma.
    // radius = sqrt(2) * sigma
    // sigma = radius / sqrt(2)
    // The radius is half the width.
    // sigma = width / sqrt(8)
    const sigma = w * invSqrt8

    // normalize density to be 1 at the center.
    const weight = normPDF(gx, x, sigma) * normPDF(gy, y, sigma) * invNorm * invNorm
    return weight
}
