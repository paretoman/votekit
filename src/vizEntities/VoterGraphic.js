import tooltipForEntity from '../tooltips/tooltipForEntity.js'
import CircleGraphic from './CircleGraphic.js'
import EntityGraphic from './EntityGraphic.js'

export default function VoterGraphic(voterShape, screen, election, view) {
    const self = this

    const circle = new CircleGraphic(self, voterShape, 13, screen)
    self.circle = circle

    EntityGraphic.call(self, voterShape, screen, election)

    self.renderForeground = () => {
        // handle
        circle.render()
    }

    self.setRenderer = (rendererMaker) => {
        self.renderer = rendererMaker(voterShape)
    }
    // Click Handler

    self.click = () => {
        tooltipForEntity(self, voterShape, screen, election, view)
    }
}
