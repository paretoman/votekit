/** @module */

/**
 * Try to deepcopy an object.
 * @param {object} a - an object to copy.
 * @returns {object} A copy of a.
 */
export function jcopy(a) {
    return JSON.parse(JSON.stringify(a))
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
