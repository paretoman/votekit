import { normPDF, range } from '../../utilities/jsHelpers.js'

export default function makeGrid1D(voterGeom) {
    const isGauss = voterGeom.densityProfile === 'gaussian'
    const spread = (isGauss) ? 3 : 1
    const iWidth = Math.round(voterGeom.w * spread)
    const iGrid = range(iWidth)
    const gridX = iGrid.map((i) => i + 0.5 - iWidth * 0.5 + voterGeom.x)
    const weight = gridX.map((x) => findWeight(voterGeom, x))
    const grid = { x: gridX, weight }
    return grid
}

function findWeight(voterGeom, xi) {
    const isGauss = voterGeom.densityProfile === 'gaussian'
    if (!isGauss) {
        return 1
    }
    const { x, w } = voterGeom
    const sigma = w / Math.sqrt(2 * Math.PI) // w = sigma * sqrt(2*pi)
    const weight = w * normPDF(xi, x, sigma)
    return weight
}
