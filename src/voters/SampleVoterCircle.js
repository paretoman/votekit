/** @module */

import SimVoter from './SimVoter.js'

/**
 * VoterCircle for simulations of many sampled candidates
 * VoterCircle class with Handle component to take care of dragging.
 * @param {VoterCircle} voterCircle - a voter component that SimVoter builds upon.
 * @param {DraggableManager} dragm
 * @param {screen} screen - draw to the screen
 * @constructor
 */
export default function SampleVoterCircle(voterCircle, dragm, screen) {
    const self = this
    SimVoter.call(self, voterCircle, dragm)

    // Graphics component
    self.render = function () {
        const { ctx } = screen
        // circle
        ctx.beginPath()
        // ctx.fillStyle = "#eee"
        const { x, y, g2 } = self.voter
        ctx.arc(x, y, g2.w * 0.5, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()
    }
}
