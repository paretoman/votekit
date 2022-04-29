/** @module */

/**
 * Show Voters
 * @param {SampleVoters} sampleVoters
 * @param {screen} screen - draw to the screen
 * @constructor
 */
export default function VizSample2D(sampleVoters, screen, changes) {
    const self = this

    // Candidates //

    // buffer canvas
    const canvas2 = document.createElement('canvas')
    canvas2.width = screen.canvas.width
    canvas2.height = screen.canvas.height
    const context2 = canvas2.getContext('2d')

    self.start = function () {
        clearBuffer()
    }

    self.update = function (addResult) {
        if (changes.checkNone() === false) {
            self.start()
        }

        const { noChange, newPoints, points } = addResult

        if (!noChange) {
            self.updatePoints(newPoints, points)
        }

        // if (changes.checkNone()) {
        //     const { noChange, newPoints, points } = addResult

        //     if (!noChange) {
        //         self.updatePoints(newPoints, points)
        //     }
        // } else {
        //     self.start()
        // }
    }

    self.updatePoints = function (newPoints, points) {
        self.points = points
        renderToBuffer(newPoints)
    }

    self.render = () => {
        self.renderCans()
        self.renderVoters()
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
            ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI)
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

    // Voters //

    self.renderVoters = function () {
        const { ctx } = screen
        const voterShapes = sampleVoters.getVoterShapes()
        voterShapes.forEach((voterGroup) => {
            // circle
            ctx.beginPath()
            // ctx.fillStyle = "#eee"
            const { x, y, shape2 } = voterGroup
            ctx.arc(x, y, shape2.w * 0.5, 0, 2 * Math.PI)
            // ctx.fill()
            ctx.stroke()
        })
    }
}
