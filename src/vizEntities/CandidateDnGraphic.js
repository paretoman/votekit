import tooltipForEntity from '../tooltips/tooltipForEntity.js'
import { drawStrokedColor, textPercent } from '../utilities/graphicsUtilities.js'
import EntityGraphic from './EntityGraphic.js'
import SquareGraphic from './SquareGraphic.js'

// eslint-disable-next-line max-len
export default function CandidateDnGraphic(candidateDn, screen, election, wHandle, hHandle, viewSettings) {
    const self = this

    const square = new SquareGraphic(self, candidateDn, wHandle, hHandle, screen)
    self.square = square

    EntityGraphic.call(self, candidateDn, screen, election)

    self.setWinFraction = (winFraction) => {
        // animate the win or loss.
        if (self.winFraction !== winFraction) {
            if (winFraction > self.winFraction) {
                square.win()
            } else if (self.winFraction > winFraction) {
                square.lose()
            }
        }
        self.winFraction = winFraction
    }

    self.renderForeground = () => {
        square.render()
        const { party } = candidateDn
        const { x, y } = self

        const { fctx, darkMode } = screen
        const color = (darkMode) ? '#fff' : '#222'

        if (election.socialChoice.electionMethod === 'olprA') {
            const x3 = x + square.w * 0.1
            const y3 = y + 8
            drawStrokedColor(`p${party}`, x3, y3, 13, 2, color, 1, fctx)
        }

        if (self.winFraction !== undefined) {
            const y2 = y + square.h * 0.5 + 20 + 2
            drawStrokedColor(textPercent(self.winFraction), x, y2, 20, 2, color, 1, fctx)
        }
    }
    self.setRenderer = (rendererMaker) => {
        self.renderer = rendererMaker(candidateDn)
    }

    // Click Handler
    self.click = () => {
        tooltipForEntity(self, candidateDn, screen, election, viewSettings)
    }
}
