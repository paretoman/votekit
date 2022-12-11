import tooltipForEntity from '../tooltips/tooltipForEntity.js'
import { drawStrokedColor, textPercent } from '../utilities/graphicsUtilities.js'
import EntityGraphic from './EntityGraphic.js'
import SquareGraphic from './SquareGraphic.js'

// eslint-disable-next-line max-len
export default function CandidateGraphic(candidate, screen, election, wHandle, hHandle, viewSettings) {
    const self = this

    const square = new SquareGraphic(self, candidate, wHandle, hHandle, screen)
    self.square = square

    EntityGraphic.call(self, candidate, screen, election)

    self.fraction = 0
    self.setFraction = function (fraction) {
        self.fraction = fraction
    }

    self.wins = 0
    self.setWins = (wins) => {
        // animate the win or loss.
        if (self.wins !== wins) {
            if (wins > self.wins) {
                square.win()
            } else if (self.wins > wins) {
                square.lose()
            }
        }
        self.wins = wins
    }

    self.renderForeground = function () {
        square.render()

        const { exists, party } = candidate
        const { x, y } = self

        const { fctx, darkMode } = screen
        const color = (darkMode) ? '#fff' : '#222'

        // show minimal graphics when rendering as a ghost.
        if (exists === 0) return

        const y1 = y - square.h * 0.5 - 2
        drawStrokedColor(textPercent(self.fraction), x, y1, 20, 2, color, 1, fctx)

        if (self.wins !== undefined) {
            const y2 = y + square.h * 0.5 + 20 + 2
            drawStrokedColor(self.wins, x, y2, 20, 2, color, 1, fctx)
        }
        if (election.socialChoice.electionMethod === 'olprA') {
            const x3 = x + square.w * 0.1
            const y3 = y + 8
            drawStrokedColor(`p${party}`, x3, y3, 13, 2, color, 1, fctx)
        }
    }

    // Click Handler
    self.click = () => {
        tooltipForEntity(self, candidate, screen, election, viewSettings)
    }
}
