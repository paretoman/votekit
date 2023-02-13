/** @module */

import VoterRender1D from './VoterRender1D.js'
import VoterRender2D from './VoterRender2D.js'

/**
 * Show Voters
 * @param {VoterRendererList} voterRendererList
 * @param {screen} screen - draw to the screen
 * @constructor
 */
// eslint-disable-next-line max-len
export default function VizSampleDensity1D(voterRendererList, canDnRendererList, screen, changes, simOptions) {
    const self = this

    // adjustable visual parameters
    const kw = 20
    const ikw = 1 / kw

    // sum and total density
    const { width } = screen
    const sum = Array(width).fill(0)
    let total = 0

    const { dimensions } = simOptions

    // voter renderer factory //
    const VoterRenderer = (dimensions === 1) ? VoterRender1D : VoterRender2D
    voterRendererList.setRenderer((voterShape) => new VoterRenderer(voterShape, screen))
    canDnRendererList.setRenderer((voterShape) => new VoterRenderer(voterShape, screen))

    self.update = function (samplingResult) {
        if (changes.checkAny()) {
            start()
        }

        const { pointsChanged, newPointsList, newPointsCount } = samplingResult

        if (pointsChanged) {
            updatePoints(newPointsList, newPointsCount)
        }
    }

    function start() {
        sum.fill(0)
        total = 0
    }

    const kernelsize = 4 / 3
    function updatePoints(newPointsList, newPointsCount) {
        // add to sum for each point
        const nk = newPointsList.length
        for (let k = 0; k < nk; k++) {
            const x = newPointsList[k][0]
            const count = newPointsCount[k]
            for (let i = 0; i < width; i++) {
                sum[i] += kernel(i - x) * count
            }
            total += kernelsize * count
        }
    }

    function kernel(x) {
        if (x > kw || x < -kw) return 0
        return (1 - (x * ikw) ** 2) * ikw
    }

    self.render = () => {
        renderCans()

        voterRendererList.render()
        canDnRendererList.render()
    }

    function renderCans() {
        const { ctx } = screen
        ctx.save()

        ctx.beginPath()
        doPath(ctx)
        ctx.strokeStyle = '#ccc'
        ctx.stroke()
        ctx.fillStyle = '#ccc'
        ctx.fill()

        ctx.restore()
    }

    const h = 100
    const middle = 150
    function doPath(ctx) {
        const norm = 1 / total

        const amp = h * 100
        const bottom = middle + h * 0.5
        // start bottom left
        ctx.moveTo(0, bottom)
        const pa = []
        for (let i = 0; i <= width; i += 1) {
            const y = bottom - amp * sum[i] * norm
            pa.push(y)
            ctx.lineTo(i, y)
        }
        // end bottom right
        ctx.lineTo(screen.width, bottom)
        ctx.lineTo(0, bottom)
    }
}
