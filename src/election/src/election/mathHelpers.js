/**
 * List the indices of an array of length n.
 * @param {number} n - length of array
 * @returns {number[]} - A number array from 0 to n-1.
 */
export function range(n) {
    const a = Array(n)
    for (let i = 0; i < n; i++) {
        a[i] = i
    }
    return a
}

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

export function minIndex(a) {
    let min = Infinity
    let iClosest = null
    for (let i = 0; i < a.length; i++) {
        const d = a[i]
        if (d < min) {
            min = d
            iClosest = i
        }
    }
    return iClosest
}

export function maxIndex(a) {
    let max = -Infinity
    let iMax = null
    for (let i = 0; i < a.length; i++) {
        const d = a[i]
        if (d > max) {
            max = d
            iMax = i
        }
    }
    return iMax
}

export function minMax(a) {
    let min = a[0]
    let max = a[0]
    for (let i = 0; i < a.length; i++) {
        const d = a[i]
        if (d < min) {
            min = d
        }
        if (d > max) {
            max = d
        }
    }
    return [min, max]
}

export function sumArray(a) {
    return a.reduce((p, c) => p + c)
}
