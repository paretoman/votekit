/**
 * Graphics Utilities
 * Just a few helpful functions that are self-contained and don't need much context.
 * @module */

export * from './colorBlendScript.js'

export function drawStrokedColor(text, x, y, textsize, lw, color, alpha, ctx, textAlign) {
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.textAlign = textAlign || 'center'
    ctx.font = `${textsize}px Sans-serif`
    ctx.lineWidth = lw
    ctx.fillStyle = color
    ctx.fillText(text, x, y)
    ctx.restore()
}

export function textPercent(f) {
    if (f === undefined) return ''
    const a = (100 * f).toFixed(0)
    return a
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
