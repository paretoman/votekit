/**
 * Javascript Utilities
 * Just a few helpful functions that are self-contained and don't need much context.
 * @module */

/**
 * List the indices of an array of length n.
 * @param {Number} n - length of array
 * @returns {Number[]} - A number array from 0 to n-1.
 */
export function range(n) {
    return [...Array(n).keys()]
}

/**
 * Try to deepcopy an object.
 * @param {Object} a - an object to copy.
 * @returns {Object} A copy of a.
 */
export function jcopy(a) {
    return JSON.parse(JSON.stringify(a))
}

/** https://stackoverflow.com/a/35810961 */
function sortObjByKey(value) {
    // eslint-disable-next-line no-nested-ternary
    return (typeof value === 'object')
        ? (Array.isArray(value)
            ? value.map(sortObjByKey)
            : Object.keys(value).sort().reduce((o, key) => {
                const v = value[key]
                // eslint-disable-next-line no-param-reassign
                o[key] = sortObjByKey(v)
                return o
            }, {})
        )
        : value
}

export function orderedJsonStringify(obj) {
    return JSON.stringify(sortObjByKey(obj), null, '\t')
}

export function normPDF(x, mean, sd) {
    const coef = 1 / (sd * Math.sqrt(2 * Math.PI))
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

/** https://stackoverflow.com/a/47355187 */
export function standardizeColor(str) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = str
    const sColor = ctx.fillStyle
    canvas.remove()
    return sColor
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

/** https://stackoverflow.com/a/24719569 */
export function clamp(value, min, max) {
    if (value < min) return min
    if (value > max) return max
    return value
}

export function copyArrayShallow(a) {
    const n = a.length
    const b = Array(n)
    for (let i = 0; i < n; i++) {
        b[i] = a[i]
    }
    return b
}

export function copyArrayShallow2(a) {
    const n = a.length
    const b = Array(n)
    for (let i = 0; i < n; i++) {
        const m = a[i].length
        b[i] = Array(m)
        for (let k = 0; k < m; k++) {
            b[i][k] = a[i][k]
        }
    }
    return b
}

export function copyObjectShallow(a) {
    const b = { ...a }
    return b
}
