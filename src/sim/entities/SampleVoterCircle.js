/** @constructor */

import SimVoter from './SimVoter.js'

/**
 * VoterCircle for simulations of many sampled candidates
 * VoterCircle class with Handle component to take care of dragging.
 * @param {VoterCircle} voterCircle - a voter component that SimVoter builds upon.
 * @param {screen} screen - draw to the screen
 */
export default function SampleVoterCircle(voterCircle, screen) {
    const self = this
    SimVoter.call(self, voterCircle)

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
