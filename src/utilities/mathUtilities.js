export default function getCDF(proportion) {
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

export function randomIndexFromCDF(cdf) {
    // sample from distribution
    // pick a random number from 0 to 1
    const random1 = Math.random()
    const index = cdf.findIndex((x) => x >= random1)
    return index
}
