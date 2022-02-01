import SquareGraphic from './SquareGraphic.js'
import { drawStrokedColor, textPercent } from './graphicsUtilities.js'

export default function Candidate(x, y, w, h, color, screen, dragm, election) {
    // Candidate class on top of handle.
    // Candidate adds candidate behavior on top of a draggable handle handle.

    const self = this

    self.x = x
    self.y = y
    self.setX = function (x1) {
        self.x = x1
    }
    self.setY = function (y1) {
        self.y = y1
    }

    const square = new SquareGraphic(self, w, h, color, screen) // square is for rendering
    self.square = square

    dragm.newSquareHandle(self, square)

    election.newCandidate(self)

    self.fraction = 0
    self.setFraction = function (fraction) {
        self.fraction = fraction
    }

    self.render = function () {
        square.render()

        drawStrokedColor(textPercent(self.fraction), self.x, self.y - square.h * 0.5 - 2, 20, 2, '#222', screen.ctx)
    }
}
