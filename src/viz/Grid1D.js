import colorBlend from '../election/colorBlend.js'

/**
 * Draw grid cells to show votes.
 * @param {VoterShape} voterGeom
 * @param {Screen} screen
 * @constructor
 */
export default function Grid1D(gridData, candidateSimList, screen) {
    const self = this

    const canList = candidateSimList.getCandidates()
    const { grid, voteSet, voterGeom } = gridData

    const { x, w, densityProfile } = voterGeom
    const h = 200
    const center = 100

    const nCans = canList.length

    self.renderBackground = function () {
        const { ctx } = screen
        ctx.save()
        ctx.globalAlpha = 0.7

        // draw each can separately
        for (let i = 0; i < nCans; i++) {
            ctx.strokeStyle = '#dddddd'
            // ctx.strokeStyle = '#333333'
            ctx.beginPath()
            shapePath(ctx, i, true)
            ctx.stroke()
        }
        ctx.restore()
    }
    self.render = function () {
        const { ctx } = screen
        ctx.save()
        ctx.globalAlpha = 0.7
        for (let i = 0; i < nCans; i++) {
            // draw image
            ctx.fillStyle = canList[i].color
            ctx.strokeStyle = colorBlend([0.8, 0.2], [canList[i].color, '#000000'])
            ctx.beginPath()
            shapePath(ctx, i, false)
            ctx.fill()
            ctx.stroke()
        }
        ctx.restore()
    }
    function shapePath(ctx, iCan, drawOutline) {
        const isGauss = (densityProfile === 'gaussian')
        const gridX = grid.x
        const sigma = w / Math.sqrt(2 * Math.PI) // w = sigma * sqrt(2*pi)
        const amp = h / nCans
        const bottom = center + h * 0.5 - iCan * amp
        // start bottom left
        // go outside of screen by one pixel
        const left = Math.max(-1, gridX[0])
        ctx.moveTo(left, bottom)
        const gl = gridX.length
        for (let i = 0; i < gl; i += 1) {
            const xg = gridX[i]
            if (xg < -1) continue
            if (xg > screen.width + 1) continue
            const voteMult = (drawOutline) ? 1 : voteSet[i].tallyFractions[iCan]
            const shapeMult = (isGauss) ? Math.exp(-0.5 * ((xg - x) / sigma) ** 2) : 1
            const y = bottom - amp * shapeMult * voteMult
            ctx.lineTo(xg, y)
        }
        // end bottom right
        const right = Math.min(screen.width + 1, gridX[gl - 1])
        ctx.lineTo(right, bottom)
        // close path
        ctx.lineTo(left, bottom)
    }
}
