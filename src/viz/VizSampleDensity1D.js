/** @module */

// import GeoMaps from './GeoMaps.js'
import VoterRender1D from './VoterRender1D.js'
import VoterRender2D from './VoterRender2D.js'

/**
 * Show Voters
 * @param {VoterSimList} voterSimList
 * @param {screen} screen - draw to the screen
 * @constructor
 */
export default function VizSampleDensity1D(voterSimList, candidateDnSimList, screen, changes, sim) {
    const self = this

    // adjustable visual parameters
    const kw = 20

    // const geoMaps = new GeoMaps(voterSimList, candidateDnSimList, screen, sim)

    // sum and total density
    const { width } = screen
    const sum = Array(width).fill(0)
    let total = 0

    const { dimensions } = sim.election

    // voter renderer factory //
    const VoterRenderer = (dimensions === 1) ? VoterRender1D : VoterRender2D
    voterSimList.setRenderer((voterShape) => new VoterRenderer(voterShape, screen))
    candidateDnSimList.setRenderer((voterShape) => new VoterRenderer(voterShape, screen))

    self.update = function (addResult) {
        if (changes.checkNone() === false) {
            start()
        }

        const { pointsChanged, newPoints } = addResult

        if (pointsChanged) {
            updatePoints(newPoints)
        }
    }

    function start() {
        sum.fill(0)
        total = 0
    }

    const kernelsize = 4 / 3
    function updatePoints(newPoints) {
        // add to sum for each point
        const nk = newPoints.length
        for (let k = 0; k < nk; k++) {
            const { x } = newPoints[k]
            for (let i = 0; i < width; i++) {
                sum[i] += kernel(i - x)
            }
            total += kernelsize
        }
    }

    function kernel(x) {
        if (x > kw || x < -kw) return 0
        return (1 - (x / kw) ** 2) / kw
    }

    self.render = () => {
        // geoMaps.renderPolicyNoise()
        renderCans()

        voterSimList.render()
        candidateDnSimList.render()
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
