/** @module */

/**
 * Use this to sample a random candidate from a collection of distributions of candidates.
 * Sample a point multiple times after the constructor call.
 * @param {CandidateDn[]} candidateDistributions
 * @constructor
 */
export default function CandidateDistributionSampler1D(candidateDistributions) {
    const self = this
    // cumulative distribution function
    const cdf = getCDF(candidateDistributions)
    self.samplePoint = function () {
        return samplePoint1(candidateDistributions, cdf)
    }
}

function samplePoint1(candidateDistributions, cdf) {
    // pick a voter distribution
    const iDist = randomDistribution(cdf)
    const cd = candidateDistributions[iDist]
    // sample circle
    const isGaussian = cd.shape1.densityProfile === 'gaussian'
    const sample = (isGaussian) ? sampleGaussian : randomInsideInterval
    const shape1 = sample(cd.shape1.x, cd.shape1.w * 0.5)
    const party = [iDist]
    const point = { shape1, party }
    return point
}

function randomDistribution(cdf) {
    // sample from distribution
    // pick a random number from 0 to 1
    const random1 = Math.random()
    const selectDistribution = cdf.findIndex((x) => x >= random1)
    return selectDistribution
}

function getCDF(candidateDistributions) {
    // find the size of the voter distributions
    const proportion = candidateDistributions.map((cd) => cd.shape1.w)

    const sumProportion = proportion.reduce((p, c) => p + c)

    // probability mass function
    const pmf = proportion.map((p) => p / sumProportion)

    // https://stackoverflow.com/a/20477613
    // [5, 10, 3, 2];
    // [5, 15, 18, 20]
    // cumulative distribution function
    const cdf = []
    pmf.reduce((p, c, i) => {
        const a = p + c
        cdf[i] = a
        return a
    }, 0)

    return cdf
}

function randomInsideInterval(X, R) {
    const x = (Math.random() * 2 - 1) * R + X
    return { x }
}

function sampleGaussian(X, R) {
    // https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform

    const u1 = Math.random()
    const u2 = Math.random()

    const sigma = (2 * R) / Math.sqrt(2 * Math.PI)
    const mag = sigma * Math.sqrt(-2 * Math.log(u1))
    const x = mag * Math.cos(2 * Math.PI * u2) + X
    // const x2 = mag * Math.sin(2 * Math.PI * u2) + X
    return { x }
}
