import Square from './Square.js'
import { drawStrokedColor, textPercent } from './graphicsUtilities.js'

export default function Candidate(x, y, w, h, color, screen, dragm, election) {
    // Candidate class on top of square.
    // Candidate adds candidate behavior on top of a draggable square handle.

    const self = this

    const square = new Square(x, y, w, h, color, screen, dragm)
    self.square = square

    election.newCandidate(self)

    self.fraction = 0
    self.setFraction = function (fraction) {
        self.fraction = fraction
    }

    self.render = function () {
        square.render()

        drawStrokedColor(textPercent(self.fraction), square.x, square.y - square.h * 0.5 - 2, 20, 2, '#222', screen.ctx)
    }
}
