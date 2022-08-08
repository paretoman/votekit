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
export default function VizSample(voterSimList, candidateDnSimList, screen, changes, sim) {
    const self = this

    // const geoMaps = new GeoMaps(voterSimList, candidateDnSimList, screen, sim)

    // Candidates //

    // buffer canvas
    const canvas2 = document.createElement('canvas')
    canvas2.width = screen.canvas.width
    canvas2.height = screen.canvas.height
    const context2 = canvas2.getContext('2d')

    const { dimensions } = sim.election

    // voter renderer factory //
    const VoterRenderer = (dimensions === 1) ? VoterRender1D : VoterRender2D
    voterSimList.setRenderer((voterShape) => new VoterRenderer(voterShape, screen))
    candidateDnSimList.setRenderer((voterShape) => new VoterRenderer(voterShape, screen))

    self.update = function (addResult) {
        if (changes.checkNone() === false) {
            self.start()
        }

        const {
            pointsChanged, newPoints, points, partyWinFraction,
        } = addResult

        if (pointsChanged) {
            self.updatePoints(newPoints, points)
            candidateDnSimList.setCandidateDnWins(partyWinFraction)
        }
    }

    self.start = function () {
        clearBuffer()
    }

    self.updatePoints = function (newPoints, points) {
        self.points = points
        renderToBuffer(newPoints)
    }

    self.render = () => {
        // geoMaps.renderPolicyNoise()
        self.renderCans()

        voterSimList.render()
        candidateDnSimList.render()
    }

    self.renderCans = function () {
        if (screen.noBuffers) {
            noBufferRender()
        } else {
            bufferRender()
        }
    }

    function clearBuffer() {
        context2.clearRect(0, 0, canvas2.width, canvas2.height)
    }

    function renderToBuffer(newPoints) {
        const ctx = context2
        renderPoints(ctx, newPoints)
    }

    function renderPoints(ctx, newPoints) {
        ctx.fillStyle = 'grey'
        const n = newPoints.length
        for (let i = 0; i < n; i++) {
            const p = newPoints[i]
            // dot
            ctx.beginPath()
            const y = (dimensions === 1)
                ? Math.random() * 100 + 0
                : p.y
            ctx.arc(p.x, y, 2, 0, 2 * Math.PI)
            ctx.fill()
        }
    }

    function bufferRender() {
        const { ctx } = screen
        ctx.drawImage(canvas2, 0, 0)
    }

    // use this if we want to export to an SVG
    function noBufferRender() {
        const { ctx } = screen
        renderPoints(ctx, self.points)
    }
}
