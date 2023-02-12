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

/** https://stackoverflow.com/a/24719569 */
export function clamp(value, min, max) {
    if (value < min) return min
    if (value > max) return max
    return value
}

export function hashCode(s) { // https://stackoverflow.com/a/7616484
    let hash = 0; let i; let
        chr
    for (i = 0; i < s.length; i++) {
        chr = s.charCodeAt(i)
        hash = ((hash << 5) - hash) + chr
        hash |= 0 // Convert to 32bit integer
    }

    // I will only use non-negative integers because it might be easier.
    // So basically, I'm setting the first bit to 0.
    const half = 2147483648
    return (hash + half) % half
}
