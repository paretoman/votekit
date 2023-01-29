/** @module */

/**
 * Use this to sample a random candidate from a collection of distributions of candidates.
 * Sample a point multiple times after the constructor call.
 * @param {CandidateDn[]} candidateDistributions
 * @constructor
 */
export default function CandidateDistributionSampler2D(candidateDistributions) {
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
    const { x, y, w, densityProfile } = cd.shape2
    // sample circle
    const randomSample = (densityProfile === 'gaussian') ? randomInsideGaussian : randomInsideCircle
    const canGeom = randomSample(x, y, w * 0.5)

    const { party } = cd
    const point = { canGeom, party }
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
    const areasProportion = candidateDistributions.map((cd) => cd.shape2.w ** 2)

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
    const [a, b] = randomUnitCircle()
    const x = X + R * a
    const y = Y + R * b
    return { x, y }
}

function randomUnitCircle() {
    let a; let b; let c
    do {
        a = 2 * Math.random() - 1
        b = 2 * Math.random() - 1
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
 * @returns
 */
function randomInsideGaussian(X, Y, R) {
    const [a, b] = randomStandardNormal()
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
function randomStandardNormal() {
    let a; let b; let c
    do {
        a = 2 * Math.random() - 1
        b = 2 * Math.random() - 1
        c = a * a + b * b
    } while (c > 1 || c === 0)
    const d = Math.log(c) / c
    const e = Math.sqrt(-2 * d)
    return [e * a, e * b]
}
