/** @module */

import SquareGraphic from './SquareGraphic.js'

/**
 * This represents a spatial distribution of candidates.
 * A draggable handle handle provides draggable behavior.
 * @param {Number} x
 * @param {Number} y
 * @param {Number} r
 * @param {Screen} screen
 * @param {DraggableManager} dragm
 * @param {Candidates} candidates
 */
export default function CandidateDistribution(x, y, r, screen, dragm, candidates) {
    const self = this

    self.exists = true
    self.x = x
    self.y = y
    self.r = r
    self.setX = function (x1) {
        self.x = x1
    }
    self.setY = function (y1) {
        self.y = y1
    }
    self.setXY = function (p) {
        self.x = p.x
        self.y = p.y
    }

    const square = new SquareGraphic(self, 10, 10, '#ccc', screen) // square is for rendering
    self.square = square

    dragm.newSquareHandle(self, square)

    candidates.newCandidateDistribution(self)

    self.render = function () {
        const { ctx } = screen

        ctx.beginPath()
        // ctx.fillStyle = "grey"
        ctx.arc(self.x, self.y, self.r, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()
    }
    self.renderForeground = () => {
        square.render()
    }
}
