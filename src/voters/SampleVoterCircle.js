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
        const { x, y, r } = self.voter
        ctx.arc(x, y, r, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()
    }
}
