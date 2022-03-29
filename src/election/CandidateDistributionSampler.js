/** @module */

/**
 * Use this to sample a random candidate from a collection of distributions of candidates.
 * Sample a point multiple times after the constructor call.
 * @param {CandidateDistribution[]} candidateDistributions
 * @constructor
 */
export default function CandidateDistributionSampler(candidateDistributions) {
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
    const point = randomInsideCircle(cd.x, cd.y, cd.w2 * 0.5)
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
    const areasProportion = candidateDistributions.map((cd) => cd.w2 ** 2)

    const sumAreasProportion = areasProportion.reduce((p, c) => p + c)

    // probability mass function
    const pmf = areasProportion.map((p) => p / sumAreasProportion)

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

function randomInsideCircle(X, Y, R) {
    // https://stackoverflow.com/a/50746409
    const r = R * Math.sqrt(Math.random())
    const theta = Math.random() * 2 * Math.PI

    // convert to cartesian

    const x = X + r * Math.cos(theta)
    const y = Y + r * Math.sin(theta)
    return { x, y }
}
