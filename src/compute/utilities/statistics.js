const coefInvSqrt2Pi = 1 / (Math.sqrt(2 * Math.PI))

export function normPDF(x, mean, sd) {
    const coef = coefInvSqrt2Pi / sd
    return coef * Math.exp(-0.5 * ((x - mean) / sd) ** 2)
}

export function normCDF(x, mean, sd) {
    if (x === Infinity) {
        return 1
    } if (x === -Infinity) {
        return 0
    }
    return 0.5 * erf((x - mean) / (sd * Math.sqrt(2))) + 0.5
}

function erf(x) {
    const ERF_A = 0.147
    const x2 = x ** 2
    const down = 1 + ERF_A * x2
    const up = 4 / Math.PI + ERF_A * x2
    const ratio = -(up / down) * x2
    const expofun = Math.exp(ratio)
    const radical = Math.sqrt(1 - expofun)
    const z = radical * Math.sign(x)
    return z
}

/**
 * Make a cumulative distribution function CDF for a set of proportions.
 * @param {number[]} proportion - Doesn't have to add to 1. Will normalize.
 * @returns {number[]} cdf - Use with randomIndexFromCDF
 */
export function getCDF(proportion) {
    // probability mass function
    const pmf = normalizePDF(proportion)

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

export function normalizePDF(pdf) {
    const sum = pdf.reduce((p, c) => p + c)
    return pdf.map((p) => p / sum)
}

export function pdfFromCdf(a) {
    return a.map((x, i) => {
        if (i === 0) {
            return x
        }
        return x - a[i - 1]
    })
}

export function randomIndexFromCDF(cdf, rng) {
    // sample from distribution
    // pick a random number from 0 to 1
    const random1 = rng()
    const index = cdf.findIndex((x) => x >= random1)
    return index
}
