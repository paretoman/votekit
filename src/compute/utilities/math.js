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

export function sumArray(a) {
    return a.reduce((p, c) => p + c)
}

export function last(a) {
    const n = a.length
    return a[n - 1]
}
