/** @module */

// import { normal } from 'color-blend'

import { blend, toRGBA } from '../lib/colorBlendScript.js'

/**
 * Blend colors in given proportions.
 * @param {Number[]} f - proportions of colors, as fraction of 1.
 * @param {String[]} colors -
 * @returns {String} - Color
 */
export default function colorBlend(f, colors) { // f fractions
    let fracSum = f[0]
    let colorB = colors[0]
    for (let i = 1; i < f.length; i++) {
        const fraction = frac(f[i], fracSum)
        colorB = blend(colorB, colors[i], fraction)
        fracSum += f[i]
    }
    return colorB
}

export function colorBlend3(f, colors) { // f fractions
    const fraction01 = frac(f[1], f[0])
    const color01 = blend(colors[0], colors[1], fraction01)
    const fraction012 = frac(f[2], f[1] + f[0])
    const color012 = blend(color01, colors[2], fraction012)
    return color012
}

function frac(thing, other) {
    return thing / (thing + other)
}

export { toRGBA }
