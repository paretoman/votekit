/** @module */

import getCDF, { randomIndexFromCDF } from '../../utilities/mathUtilities.js'

/**
 * Use this to sample a random candidate from a collection of distributions of candidates.
 * Sample a point multiple times after the constructor call.
 * @param {CandidateDn[]} candidateDistributions
 * @constructor
 */
export default function CandidateDistributionSampler1D(candidateDistributions) {
    const self = this

    // cumulative distribution function
    // find the size of the voter distributions
    const proportion = candidateDistributions.map((cd) => cd.shape1.w)
    const cdf = getCDF(proportion)

    self.samplePoint = function () {
        return samplePoint1(candidateDistributions, cdf)
    }
}

function samplePoint1(candidateDistributions, cdf) {
    // pick a voter distribution
    const iDist = randomIndexFromCDF(cdf)
    const cd = candidateDistributions[iDist]
    // sample circle
    const isGaussian = cd.shape1.densityProfile === 'gaussian'
    const sample = (isGaussian) ? sampleGaussian : randomInsideInterval
    const canGeom = sample(cd.shape1.x, cd.shape1.w * 0.5)
    const { party } = cd
    const point = { canGeom, party }
    return point
}

function randomInsideInterval(X, R) {
    const x = (Math.random() * 2 - 1) * R + X
    return { x }
}

const invSqrtHalfPi = 1 / Math.sqrt(Math.PI / 2)

function sampleGaussian(X, R) {
    // to compare a block to a normal distribution
    // set the block density to the normal density at 0.
    // Then the radius R of the block is related to sigma.
    // R is at sqrt(pi/2) * sigma
    // sigma = R / sqrt(pi/2)
    // The radius is half the width.
    const a = sampleStandardNormal()
    const sigma = R * invSqrtHalfPi
    const x = a * sigma + X
    // const x2 = mag * Math.sin(2 * Math.PI * u2) + X
    return { x }
}

function sampleStandardNormal() {
    // https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
    const u1 = Math.random()
    const u2 = Math.random()
    const mag = Math.sqrt(-2 * Math.log(u1))
    const x = mag * Math.cos(2 * Math.PI * u2)
    return x
}
