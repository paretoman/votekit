/** @module */

import CircleGraphic from './CircleGraphic.js'

/**
 * A basis of voters, to be moved around according to noise.
 * Also, the user can move them around.
 * @param {Number} x
 * @param {Number} y
 * @param {Number} r - radius of circle of candidate positions.
 * @param {Screen} screen
 * @param {DraggableManager} dragm
 * @param {GeoElection} geoElection
 */
export default function GeoVoterBasis(x, y, r, screen, dragm, geoVoters) {
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

    geoVoters.newVoterBasis(self)

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
    self.renderAt = function (newX, newY) {
        const { ctx } = screen
        // circle
        ctx.beginPath()
        // ctx.fillStyle = "#eee"
        ctx.arc(newX, newY, self.r, 0, 2 * Math.PI)
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
