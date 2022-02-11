// import SimplexNoise from 'https://cdn.skypack.dev/simplex-noise@3.0.1'
import { SimplexNoise } from '../../lib/simplex-noise/esm/simplex-noise.js'
// https://runkit-packages.com/14.x.x/1644541101130/simplex-noise/#simplex-noisejs
// https://npm.runkit.com/simplex-noise
// https://www.npmjs.com/package/simplex-noise

/**
 * Generate a noisy 2D map with two noise sources per pixel.
 * @param {Number} nx - Number of x pixels
 * @param {Number} ny - Number of y pixels
 * @param {Number} noiseWidth -  A characteristic size of blobs, in pixels
 * @param {Number} noiseHeight - A characteristic size of blobs, in pixels
 * @returns
 */
export default function geoNoise(nx, ny, noiseWidth, noiseHeight) {
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
            p[0] -= meanX
            // eslint-disable-next-line no-param-reassign
            p[1] -= meanY
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
