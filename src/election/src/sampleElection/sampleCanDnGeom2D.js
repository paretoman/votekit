/** @module */

/**
 * Use this to sample a random candidate from a distribution.
 * @param {Object} canDnGeom
 * @returns {Object} x,y coordinates
 */
export default function sampleCanDnGeom2D(canDnGeom, rng) {
    const { x, y, w, densityProfile } = canDnGeom

    const randomSample = (densityProfile === 'gaussian') ? randomInsideGaussian : randomInsideCircle
    const canGeom = randomSample(x, y, w * 0.5, rng)
    return canGeom
}

function randomInsideCircle(X, Y, R, rng) {
    const [a, b] = randomUnitCircle(rng)
    const x = X + R * a
    const y = Y + R * b
    return { x, y }
}

function randomUnitCircle(rng) {
    let a; let b; let c
    do {
        a = 2 * rng() - 1
        b = 2 * rng() - 1
        c = a * a + b * b
    } while (c > 1 || c === 0)
    return [a, b]
}

const invSqrt2 = 1 / Math.sqrt(2)

/**
 * Two samples from gaussian around center with stdev scaled to R.
 * @param {Number} X center.x
 * @param {Number} Y center.y
 * @param {Number} R radius = stdev * sqrt(2)
 * @returns {Object} point
 */
function randomInsideGaussian(X, Y, R, rng) {
    const [a, b] = randomStandardNormal(rng)
    // pdfN01 fits inside circle of radius sqrt(2) and density pdfN01([0,0])
    // So we increase the density a little more to fit inside unit circle.
    // Then expand to fill circle of radius R.
    // The circle has a radius R = stdev * sqrt(2).
    const scale = R * invSqrt2
    const x = X + scale * a
    const y = Y + scale * b
    return { x, y }
}

/**
 * Marsaglia Method
 * https://www.alanzucconi.com/2015/09/16/how-to-sample-from-a-gaussian-distribution/
 * @returns {Number[]} Two samples from Random standard normal with mean 0 and stdev 1.
 */
function randomStandardNormal(rng) {
    let a; let b; let c
    do {
        a = 2 * rng() - 1
        b = 2 * rng() - 1
        c = a * a + b * b
    } while (c > 1 || c === 0)
    const d = Math.log(c) / c
    const e = Math.sqrt(-2 * d)
    return [e * a, e * b]
}
