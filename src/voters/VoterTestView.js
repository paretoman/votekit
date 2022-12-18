import VoterTestGraphic from './VoterTestGraphic.js'
import VoterTest from './VoterTest.js'

export default function VoterTestView(screen, sim, viewOne, viewSettings) {
    const self = this

    self.voterTest = new VoterTest(viewOne)

    self.graphic = new VoterTestGraphic(self.voterTest, screen, sim, viewOne, viewSettings)

    viewOne.dragm.add(self)
}
