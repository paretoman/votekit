/** @module */

import VoterRender1D from './VoterRender1D.js'
import VoterRender2D from './VoterRender2D.js'

/**
 * Show Voters
 * @param {VoterRendererList} voterRendererList
 * @param {screen} screen - draw to the screen
 * @constructor
 */
export default function VizSample(voterRendererList, canDnRendererList, screen, changes, sim) {
    const self = this

    // Candidates //

    // buffer canvas
    const canvas2 = document.createElement('canvas')
    canvas2.width = screen.canvas.width
    canvas2.height = screen.canvas.height
    const context2 = canvas2.getContext('2d')

    const { dimensions } = sim.election

    // voter renderer factory //
    const VoterRenderer = (dimensions === 1) ? VoterRender1D : VoterRender2D
    voterRendererList.setRenderer((voterShape) => new VoterRenderer(voterShape, screen))
    canDnRendererList.setRenderer((voterShape) => new VoterRenderer(voterShape, screen))

    self.update = function (addResult) {
        if (changes.checkAny()) {
            self.start()
        }

        const {
            pointsChanged, newPoints, points,
        } = addResult

        if (pointsChanged) {
            self.updatePoints(newPoints, points)
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
        self.renderCans()

        voterRendererList.render()
        canDnRendererList.render()
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
