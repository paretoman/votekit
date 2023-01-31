import { normPDF, range } from '../../utilities/jsHelpers.js'

export default function makeGrid2D(voterGeom, castOptions) {
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
    const testVoter = Array(gridLength)
    let i = 0

    for (let iy = 0; iy < iyGrid.length; iy++) {
        for (let ix = 0; ix < ixGrid.length; ix++) {
            const gx = gridXMargin[ix]
            const gy = gridYMargin[iy]
            gridX[i] = gx
            gridY[i] = gy
            testVoter[i] = { x: gx, y: gy }
            i += 1
        }
    }

    const findDensity = (isGauss) ? findDensityGauss : findDensityCircle
    const density = findDensity(voterGeom, gridX, gridY)

    const grid = {
        x: gridX, y: gridY, weight: density, nx, ny, width, testVoter,
    }
    return grid
}

function findDensityCircle(voterGeom, gridX, gridY) {
    const { x, y, w } = voterGeom

    const ni = gridX.length
    const density = Array(ni).fill(0)
    for (let i = 0; i < ni; i++) {
        const gx = gridX[i]
        const gy = gridY[i]

        const d2 = (gx - x) ** 2 + (gy - y) ** 2
        const r2 = (0.5 * w) ** 2
        // TODO: for edges, determine how much of the area of the pixel is within the shape.
        if (d2 < r2) {
            density[i] = 1
        }

        // const density = (d2 < r2) ? 1 : 0
        // return density
    }

    return density
}

const invSqrt8 = 1 / Math.sqrt(8)

function findDensityGauss(voterGeom, gridX, gridY) {
    const { x, y, w } = voterGeom

    // To compare a circle to a 2D normal distribution,
    // set the circle's density to the normal's density at 0.
    // Then the radius R of the circle is related to sigma.
    // radius = sqrt(2) * sigma
    // sigma = radius / sqrt(2)
    // The radius is half the width.
    // sigma = width / sqrt(8)
    const sigma = w * invSqrt8

    // normalize density to be 1 at the center.
    const invNorm = 1 / normPDF(0, 0, sigma)
    const invNorm2 = invNorm ** 2

    const ni = gridX.length
    const density = Array(ni)
    for (let i = 0; i < ni; i++) {
        const gx = gridX[i]
        const gy = gridY[i]
        density[i] = normPDF(gx, x, sigma) * normPDF(gy, y, sigma) * invNorm2
    }
    return density
}
