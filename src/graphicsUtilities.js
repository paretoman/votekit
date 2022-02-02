/**
 * Graphics Utilities
 * Just a few helpful functions that are self-contained and don't need much context.
 * @module */

export function drawStrokedColor(text, x, y, textsize, lw, color, ctx, textAlign) {
    ctx.save()
    ctx.textAlign = textAlign || 'center'
    ctx.font = `${textsize}px Sans-serif`
    ctx.lineWidth = lw
    ctx.fillStyle = color
    ctx.fillText(text, x, y)
    ctx.restore()
}

export function textPercent(f) {
    const a = (100 * f).toFixed(0)
    return a
}
