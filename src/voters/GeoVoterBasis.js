/** @module */

import SimVoter from './SimVoter.js'
/**
 * A basis of voters, to be moved around according to noise.
 * Also, the user can move them around.
 * This is a Subclass of SimVoter.
 * @param {VoterCircle} voterCircle - a voter component that SimVoter builds upon.
 * @param {DraggableManager} dragm
 * @param {screen} screen - draw to the screen
 * @constructor
 */
export default function GeoVoterBasis(voterCircle, dragm, screen) {
    const self = this
    SimVoter.call(self, voterCircle, dragm)

    // Graphics component
    self.render = function () {
        const { ctx } = screen
        // circle
        ctx.beginPath()
        // ctx.fillStyle = "#eee"
        ctx.arc(self.voter.x, self.voter.y, self.voter.g2.w * 0.5, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()
    }
    self.renderAt = function (newX, newY) {
        const { ctx } = screen
        // circle
        ctx.beginPath()
        // ctx.fillStyle = "#eee"
        ctx.arc(newX, newY, self.voter.g2.w * 0.5, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()
    }
    self.renderCenterAt = function (newX, newY) {
        const { ctx } = screen
        // circle
        ctx.beginPath()
        ctx.fillStyle = '#555'
        ctx.arc(newX, newY, 1, 0, 2 * Math.PI)
        ctx.fill()
        // ctx.stroke()
    }
}
