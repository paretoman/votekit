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

// https://stackoverflow.com/a/35810961
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
