/** @module */

import VoterRender1D from './VoterRender1D.js'
import VoterRender2D from './VoterRender2D.js'

/**
 * Show Voters
 * @param {VoterRendererList} voterRendererList
 * @param {screen} screen - draw to the screen
 * @constructor
 */
export default function VizSample(voterRendererList, canDnRendererList, screen, changes, simOptions) {
    const self = this

    // Candidates //

    // buffer canvas
    const canvas2 = document.createElement('canvas')
    canvas2.width = screen.width
    canvas2.height = screen.height
    const context2 = canvas2.getContext('2d')

    const { dimensions } = simOptions

    // voter renderer factory //
    const VoterRenderer = (dimensions === 1) ? VoterRender1D : VoterRender2D
    voterRendererList.setRenderer((voterShape) => new VoterRenderer(voterShape, screen))
    canDnRendererList.setRenderer((voterShape) => new VoterRenderer(voterShape, screen))

    self.update = function (samplingResult) {
        if (changes.checkAny()) {
            self.start()
        }

        const {
            pointsChanged, samplingPointsList, samplingPointsCount,
        } = samplingResult

        if (pointsChanged) {
            // newPoints are jittered
            const newPoints = addNewPoints(samplingPointsList, samplingPointsCount)
            renderToBuffer(newPoints)
        }
    }

    self.start = function () {
        clearBuffer()
    }

    /** Add points with jitter */
    function addNewPoints(samplingPointsList, samplingPointsCount) {
        const jitterSize = 10

        const newPoints = []
        for (let i = 0; i < samplingPointsList.length; i++) {
            const point = samplingPointsList[i]
            const count = samplingPointsCount[i]

            const [x, y] = point
            for (let m = 0; m < count; m++) {
                // add jitter
                let winPoint
                if (m === 0) {
                    winPoint = [x, y]
                } else if (dimensions === 1) {
                    winPoint = [x + (Math.random() - 0.5) * jitterSize]
                } else {
                    winPoint = [
                        x + (Math.random() - 0.5) * jitterSize,
                        y + (Math.random() - 0.5) * jitterSize,
                    ]
                }
                self.points.push(winPoint)
                newPoints.push(winPoint)
            }
        }
        return newPoints
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
            const [x, y0] = newPoints[i]
            // dot
            ctx.beginPath()
            const y = (dimensions === 1)
                ? Math.random() * 100 + 0
                : y0
            ctx.arc(x, y, 2, 0, 2 * Math.PI)
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
