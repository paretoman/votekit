/** @module */

import SimVoter from '../voters/SimVoter.js'

/**
 * VoterShape for simulations of many sampled candidates
 * VoterShape class with Handle component to take care of dragging.
 * @param {VoterShape} voterShape - a voter component that SimVoter builds upon.
 * @param {DraggableManager} dragm
 * @param {screen} screen - draw to the screen
 * @constructor
 */
export default function Sample2DViz(voterShape, dragm, screen) {
    const self = this
    SimVoter.call(self, voterShape, dragm)

    // Graphics component
    self.render = function () {
        const { ctx } = screen
        // circle
        ctx.beginPath()
        // ctx.fillStyle = "#eee"
        const { x, y, shape2 } = self.voter
        ctx.arc(x, y, shape2.w * 0.5, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()
    }
}
