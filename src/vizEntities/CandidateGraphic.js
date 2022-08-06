import { drawStrokedColor, textPercent } from '../utilities/graphicsUtilities.js'
import SquareGraphic from './SquareGraphic.js'

export default function CandidateGraphic(candidate, screen, election) {
    const self = this

    const square = new SquareGraphic(candidate, candidate.wHandle, candidate.hHandle, screen)
    self.square = square

    self.fraction = 0
    self.setFraction = function (fraction) {
        self.fraction = fraction
    }

    self.setWins = (wins) => {
        self.wins = wins
    }

    self.renderForeground = function () {
        square.render()

        const {
            x, y, exists, party,
        } = candidate
        // show minimal graphics when rendering as a ghost.
        if (exists === 0) return

        drawStrokedColor(textPercent(self.fraction), x, y - square.h * 0.5 - 2, 20, 2, '#222', 1, screen.fctx)

        if (self.wins !== undefined) {
            drawStrokedColor(self.wins, x, y + square.h * 0.5 + 20 + 2, 20, 2, '#222', 1, screen.fctx)
        }
        if (election.socialChoice.electionMethod === 'olprA') {
            drawStrokedColor(`p${party}`, x + square.w * 0.1, y + 8, 13, 2, '#222', 1, screen.fctx)
        }
    }
}
