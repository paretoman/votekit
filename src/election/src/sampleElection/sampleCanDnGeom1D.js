/** @module */

/**
 * Use this to sample a random candidate from a distribution.
 * @param {object} canDnGeom
 * @returns {number} x coordinate
 */
export default function sampleCanDnGeom1D(canDnGeom, rng) {
    const { x, w, densityProfile } = canDnGeom
    // sample circle
    const isGaussian = densityProfile === 'gaussian'
    const sample = (isGaussian) ? sampleGaussian : randomInsideInterval
    const canPoint = sample(x, w * 0.5, rng)
    return canPoint
}

function randomInsideInterval(X, R, rng) {
    const x = (rng() * 2 - 1) * R + X
    return x
}

const invSqrtHalfPi = 1 / Math.sqrt(Math.PI / 2)

function sampleGaussian(X, R, rng) {
    // to compare a block to a normal distribution
    // set the block density to the normal density at 0.
    // Then the radius R of the block is related to sigma.
    // R is at sqrt(pi/2) * sigma
    // sigma = R / sqrt(pi/2)
    // The radius is half the width.
    const a = sampleStandardNormal(rng)
    const sigma = R * invSqrtHalfPi
    const x = a * sigma + X
    // const x2 = mag * Math.sin(2 * Math.PI * u2) + X
    return x
}

function sampleStandardNormal(rng) {
    // https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
    const u1 = rng()
    const u2 = rng()
    const mag = Math.sqrt(-2 * Math.log(u1))
    const x = mag * Math.cos(2 * Math.PI * u2)
    return x
}
