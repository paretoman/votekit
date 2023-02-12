/** @module */

// import SimplexNoise from 'https://cdn.skypack.dev/simplex-noise@3.0.1'
import { SimplexNoise } from '../lib/snowpack/build/snowpack/pkg/simplex-noise.js'
// https://runkit-packages.com/14.x.x/1644541101130/simplex-noise/#simplex-noisejs
// https://npm.runkit.com/simplex-noise
// https://www.npmjs.com/package/simplex-noise

/**
 * Generate a noisy 2D map with two noise sources per pixel.
 * @param {Number} nx - Number of x pixels
 * @param {Number} ny - Number of y pixels
 */
export default function makeTractNoise(nx, ny) {
    // Simplex Noise Parameters
    const noiseWidth = 0.5
    const noiseHeight = 0.5

    // District Noise Parameters - amplitude of noise
    const xAmp = 100
    const yAmp = 100

    /** Generate simplex noise. */
    const sn = simplexNoise(nx, ny, noiseWidth, noiseHeight, xAmp, yAmp)
    return sn
}

/**
 * Generate a noisy 2D map with two noise sources per pixel.
 * @param {Number} nx - Number of x pixels
 * @param {Number} ny - Number of y pixels
 * @param {Number} noiseWidth -  A characteristic size of blobs, in pixels
 * @param {Number} noiseHeight - A characteristic size of blobs, in pixels
 * @returns {Number[][][]} - Noise in pixel displacement, indexed by row, col, dimension
 */
export function simplexNoise(nx, ny, noiseWidth, noiseHeight, xAmp, yAmp) {
    const simplexX = new SimplexNoise('s')
    const simplexY = new SimplexNoise('seed')
    const map = zeros(nx, ny)
    let sumX = 0
    let sumY = 0
    range(nx).forEach((ix) => {
        range(ny).forEach((iy) => {
            // fractional coordinate divided by period of waves
            const x = (ix / nx) * (1 / noiseWidth)
            const y = (iy / ny) * (1 / noiseHeight)
            const noiseX = simplexX.noise2D(x, y)
            const noiseY = simplexY.noise2D(x, y)
            map[ix][iy][0] = (noiseX - 0.5)
            map[ix][iy][1] = (noiseY - 0.5)
            sumX += noiseX
            sumY += noiseY
        })
    })
    // normalize
    const meanX = sumX / (nx * ny) - 0.5
    const meanY = sumY / (nx * ny) - 0.5
    map.forEach((a) => { // array
        a.forEach((p) => { // pair
            // eslint-disable-next-line no-param-reassign
            p[0] = (p[0] - meanX) * xAmp
            // eslint-disable-next-line no-param-reassign
            p[1] = (p[1] - meanY) * yAmp
        })
    })
    return map
}

function zeros(nx, ny) {
    const empty = Array(nx).fill().map(() => Array(ny).fill().map(() => Array(2).fill(0)))
    return empty
}

function range(n) {
    return [...Array(n).keys()]
}
