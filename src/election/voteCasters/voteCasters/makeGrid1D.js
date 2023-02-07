import { normPDF } from '../../../utilities/jsHelpers.js'

export default function makeGrid1D(voterGeom) {
    const { gridX, testVoter, gridPointLength } = findGridX(voterGeom)
    const { density, voteCounts } = findDensity(voterGeom, gridX, gridPointLength)
    const grid = { x: gridX, density, testVoter, voteCounts, voterGeom }
    return grid
}

function findGridX(voterGeom) {
    const isGauss = voterGeom.densityProfile === 'gaussian'
    const spread = (isGauss) ? 3 : 1
    const iWidth = Math.round(voterGeom.w * spread)
    const gridX = Array(iWidth)
    const testVoter = Array(iWidth)
    const gridPointLength = 1

    for (let i = 0; i < iWidth; i++) {
        const x = i + 0.5 - iWidth * 0.5 + voterGeom.x
        gridX[i] = x
        testVoter[i] = { x }
    }
    return { gridX, testVoter, gridPointLength }
}

function findDensity(voterGeom, gridX, gridPointLength) {
    const { x, w, densityProfile } = voterGeom
    const isGauss = densityProfile === 'gaussian'
    const density = Array(gridX.length)
    const voteCounts = Array(gridX.length)

    if (!isGauss) {
        return density.fill(1)
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
