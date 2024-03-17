import { drawStrokedColor, textPercent } from '@paretoman/votekit-graphics'
import tooltipForEntity from '../tooltips/tooltipForEntity.js'
import EntityGraphic from '../vizEntities/EntityGraphic.js'
import SquareGraphic from '../vizEntities/SquareGraphic.js'
import getResultsPhaseOptions from '../phase/getResultsPhaseOptions.js'

// eslint-disable-next-line max-len
export default function CandidateDnGraphic(candidateDn, screen, wHandle, hHandle, viewSettings, simOptions, electionOptionsMan) {
    const self = this

    const square = new SquareGraphic(self, candidateDn, wHandle, hHandle, screen)
    self.square = square

    EntityGraphic.call(self, candidateDn, simOptions)

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

        const { fctx } = screen
        const { darkMode } = screen.common
        const color = (darkMode) ? '#fff' : '#222'

        const optionsBag = electionOptionsMan.getOptions()

        const resultsPhaseOptions = getResultsPhaseOptions(optionsBag, simOptions)
        const { socialChoiceMethod } = resultsPhaseOptions

        if (socialChoiceMethod === 'olprA') {
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
        tooltipForEntity(self, candidateDn, screen, viewSettings, simOptions)
    }
}
