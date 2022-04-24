/**
 * Draw grid cells to show votes.
 * @param {VoterShape} voterGeom
 * @param {Screen} screen
 * @constructor
 */
export default function Grid1D(gridData, candidateSimList, screen) {
    const self = this

    const cans = candidateSimList.getCandidates()
    const { grid, voteSet, voterGeom } = gridData

    const { x, w, densityProfile } = voterGeom
    const h = 200
    const center = 100

    self.render = function () {
        const { ctx } = screen

        ctx.save()
        ctx.globalAlpha = 0.7

        // draw each can separately
        const n = cans.length
        for (let i = 0; i < n; i++) {
            // draw image
            ctx.fillStyle = cans[i].color
            ctx.beginPath()
            shapePath(i, false)
            ctx.fill()

            ctx.strokeStyle = '#dddddd'
            // ctx.strokeStyle = '#333333'
            ctx.beginPath()
            shapePath(i, true)
            ctx.stroke()
        }

        ctx.restore()

        function shapePath(iCan, drawOutline) {
            const isGauss = (densityProfile === 'gaussian')
            const gridX = grid.x
            const sigma = w / Math.sqrt(2 * Math.PI) // w = sigma * sqrt(2*pi)
            const amp = h / n
            const bottom = center + h * 0.5 - iCan * amp
            // start bottom left
            const left = Math.max(0, gridX[0])
            ctx.moveTo(left, bottom)
            const gl = gridX.length
            for (let i = 0; i < gl; i += 1) {
                const xg = gridX[i]
                if (xg < 0) continue
                if (xg > screen.width) continue
                const voteMult = (drawOutline) ? 1 : voteSet[i].tallyFractions[iCan]
                const shapeMult = (isGauss) ? Math.exp(-0.5 * ((xg - x) / sigma) ** 2) : 1
                const y = bottom - amp * shapeMult * voteMult
                ctx.lineTo(xg, y)
            }
            // end bottom right
            const right = Math.min(screen.width, gridX[gl - 1])
            ctx.lineTo(right, bottom)
            // close path
            ctx.lineTo(left, bottom)
        }
    }
}
