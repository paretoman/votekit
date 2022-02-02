/** @module */

import CircleGraphic from './CircleGraphic.js'

/**
 * VoterCircle for simulations of many candidates
 * VoterCircle class with Handle component to take care of dragging.
 * @param {Number} x
 * @param {Number} y
 * @param {Number} r - radius of circle of candidate positions.
 * @param {Screen} screen
 * @param {DraggableManager} dragm
 * @param {Election} election
 */
export default function SimVoterCircle(x, y, r, screen, dragm, election) {
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

    election.newVoterGroup(self)

    self.update = function () {
    }

    // Graphics component
    self.render = function () {
        const { ctx } = screen
        // circle
        ctx.beginPath()
        // ctx.fillStyle = "#eee"
        ctx.arc(self.x, self.y, self.r, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()

        // handle
        circle.render()
    }
}
