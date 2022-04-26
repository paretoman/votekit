/**
 * Graphics Component for voterShapes in 2D
 * @param {VoterShape} voterShape
 * @param {Screen} screen
 */
export default function VoterRender2D(voterShape, screen) {
    const self = this

    self.render = function () {
        const { ctx } = screen
        const { x, y, shape2 } = voterShape
        // circle
        ctx.beginPath()
        // ctx.fillStyle = "#eee"
        ctx.arc(x, y, shape2.w * 0.5, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()
    }
    self.renderAt = function (newX, newY) {
        const { ctx } = screen
        const { w } = voterShape.shape2
        // circle
        ctx.beginPath()
        // ctx.fillStyle = "#eee"
        ctx.arc(newX, newY, w * 0.5, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()
    }
    self.renderCenterAt2 = function (newX, newY) {
        const { ctx } = screen
        // circle
        ctx.beginPath()
        ctx.fillStyle = '#555'
        ctx.arc(newX, newY, 1, 0, 2 * Math.PI)
        ctx.fill()
        // ctx.stroke()
    }
}
