/** @module */

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