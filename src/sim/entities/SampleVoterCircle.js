/** @module */

import CircleGraphic from './CircleGraphic.js'

/**
 * VoterCircle for simulations of many sampled candidates
 * VoterCircle class with Handle component to take care of dragging.
 * @param {Number} x
 * @param {Number} y
 * @param {Number} r - radius of circle of candidate positions.
 * @param {Screen} screen
 * @param {DraggableManager} dragm
 * @param {Voters} voters
 */
export default function SampleVoterCircle(x, y, r, screen, dragm, voters) {
    const self = this

    self.x = x
    self.y = y
    self.r = r
    self.setX = function (x1) {
        self.x = x1
    }
    self.setY = function (y1) {
        self.y = y1
    }

    const circle = new CircleGraphic(self, 10, '#555', screen)
    self.circle = circle

    dragm.newCircleHandle(self, circle)

    voters.newVoterGroup(self)

    // Graphics component
    self.render = function () {
        const { ctx } = screen
        // circle
        ctx.beginPath()
        // ctx.fillStyle = "#eee"
        ctx.arc(self.x, self.y, self.r, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()
    }
    self.renderForeground = () => {
        // handle
        circle.render()
    }
}
