import { drawStrokedColor, textPercent } from '../utilities/graphicsUtilities.js'
import SquareGraphic from './SquareGraphic.js'

export default function CandidateDnGraphic(candidateDn, screen, election) {
    const self = this

    const square = new SquareGraphic(candidateDn, 21, 21, screen) // square is for rendering
    self.square = square

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
        const {
            x, y, party,
        } = candidateDn

        if (election.socialChoice.electionMethod === 'olprA') {
            drawStrokedColor(`p${party}`, x + square.w * 0.1, y + 8, 13, 2, '#222', 1, screen.fctx)
        }

        if (self.winFraction !== undefined) {
            drawStrokedColor(textPercent(self.winFraction), x, y + square.h * 0.5 + 20 + 2, 20, 2, '#222', 1, screen.fctx)
        }
    }
    self.setRenderer = (rendererMaker) => {
        self.renderer = rendererMaker(candidateDn)
    }
}
