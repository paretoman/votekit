import { normPDF } from '../../election/mathHelpers.js'
import * as typesGeoms from '../types/typesGeoms.js'
import * as typesGrid from '../types/typesGrid.js'

/**
 * makes 1D grid data structure
 * @param {typesGeoms.voterGeom1D} voterGeom
 * @returns {typesGrid.grid1D}
 */
export default function makeGrid1D(voterGeom) {
    const { gridX, voterPoints, gridPointLength } = findGridX(voterGeom)
    const { density, voteCounts } = findDensity(voterGeom, gridX, gridPointLength)
    const grid = { x: gridX, density, voterPoints, voteCounts, voterGeom }
    return grid
}

/**
 * get x coordinates for grid
 * @param {typesGeoms.voterGeom1D} voterGeom
 * @returns {typesGrid.gridX}
 */
function findGridX(voterGeom) {
    const isGauss = voterGeom.densityProfile === 'gaussian'
    const spread = (isGauss) ? 3 : 1
    const iWidth = Math.round(voterGeom.w * spread)
    const gridX = Array(iWidth)
    const voterPoints = Array(iWidth)
    const gridPointLength = 1

    for (let i = 0; i < iWidth; i++) {
        const x = i + 0.5 - iWidth * 0.5 + voterGeom.x
        gridX[i] = x
        voterPoints[i] = { x }
    }
    return { gridX, voterPoints, gridPointLength }
}

function findDensity(voterGeom, gridX, gridPointLength) {
    const { x, w, densityProfile } = voterGeom
    const isGauss = densityProfile === 'gaussian'
    const density = Array(gridX.length)
    const voteCounts = Array(gridX.length)

    if (!isGauss) {
        density.fill(1)
        voteCounts.fill(1)
        return { density, voteCounts }
    }

    const sigma = w / Math.sqrt(2 * Math.PI) // w = sigma * sqrt(2*pi)
    const invNorm = 1 / normPDF(0, 0, sigma)
    for (let i = 0; i < gridX.length; i++) {
        const xi = gridX[i]
        const d = normPDF(xi, x, sigma) * invNorm
        density[i] = d
        voteCounts[i] = d * gridPointLength
    }

    return { density, voteCounts }
}
