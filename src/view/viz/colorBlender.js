/** @module */

/**
 * Blend colors in given proportions.
 * @param {Number[]} f - proportions of colors, as fraction of 1.
 * @param {Number[][]} colors - list of lists. rgb colors.
 * @returns {String} - Color
 */
export default function colorBlender(f, colors) { // f fractions
    const n = f.length

    const sum2 = [0, 0, 0]
    let sumF = 0
    for (let i = 0; i < n; i++) {
        for (let c = 0; c < 3; c++) {
            sum2[c] += f[i] * colors[i][c] ** 2
        }
        sumF += f[i]
    }
    const blend = sum2.map((x) => Math.round(Math.sqrt(x / sumF)))
    return blend
}

export function rgbToString(c) {
    return `rgb(${c[0]},${c[1]},${c[2]})`
}
