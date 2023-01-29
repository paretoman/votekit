/** @module */
/**
 * Graphics Component for voterShapes in 2D
 * @param {VoterShape} voterShape
 * @param {Screen} screen
 */
export default function VoterRender2D(voterShape, screen) {
    const self = this

    self.render = function () {
        const { ctx } = screen
        const { darkMode } = screen.common
        const { x, y, w, densityProfile } = voterShape.shape2
        // circle
        ctx.save()
        if (densityProfile === 'gaussian') {
            ctx.setLineDash([1, 9])
            ctx.lineWidth = 10
        }
        ctx.beginPath()
        ctx.strokeStyle = '#555'
        if (darkMode) ctx.strokeStyle = '#ddd'
        // ctx.fillStyle = "#eee"
        ctx.arc(x, y, w * 0.5, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()
        ctx.restore()
    }
    self.renderAt = function (newX, newY) {
        const { ctx } = screen
        const { darkMode } = screen.common
        const { w } = voterShape.shape2
        // circle
        ctx.beginPath()
        ctx.strokeStyle = '#555'
        if (darkMode) ctx.strokeStyle = '#ddd'
        // ctx.fillStyle = "#eee"
        ctx.arc(newX, newY, w * 0.5, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()
    }
    self.renderCenterAt2 = function (newX, newY) {
        const { ctx } = screen
        const { darkMode } = screen.common
        // circle
        ctx.beginPath()
        ctx.fillStyle = '#555'
        if (darkMode) ctx.fillStyle = '#bbb'
        ctx.arc(newX, newY, 1, 0, 2 * Math.PI)
        ctx.fill()
        // ctx.stroke()
    }
}
