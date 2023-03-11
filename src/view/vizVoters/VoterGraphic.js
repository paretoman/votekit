import tooltipForEntity from '../tooltips/tooltipForEntity.js'
import CircleGraphic from '../vizEntities/CircleGraphic.js'
import EntityGraphic from '../vizEntities/EntityGraphic.js'

export default function VoterGraphic(voterShape, screen, viewSettings, simOptions, electionOptionsMan) {
    const self = this

    const circle = new CircleGraphic(self, voterShape, 13, screen)
    self.circle = circle

    EntityGraphic.call(self, voterShape, simOptions)

    self.renderForeground = () => {
        // handle
        circle.render()
    }

    self.setRenderer = (rendererMaker) => {
        self.renderer = rendererMaker(voterShape)
    }
    // Click Handler

    self.click = () => {
        tooltipForEntity(self, voterShape, screen, viewSettings, simOptions, electionOptionsMan)
    }
}
