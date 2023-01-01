import VoterTestGraphic from './VoterTestGraphic.js'
import VoterTest from './VoterTest.js'

export default function VoterTestView(screen, simOptions, viewOne, viewSettings) {
    const self = this

    self.voterTest = new VoterTest(viewOne)

    self.graphic = new VoterTestGraphic(self.voterTest, screen, simOptions, viewOne, viewSettings)

    viewOne.dragm.add(self)
}
