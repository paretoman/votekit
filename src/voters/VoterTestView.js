import VoterTestGraphic from './VoterTestGraphic.js'
import VoterTest from './VoterTest.js'

export default function VoterTestView(screen, simOptions, viewEntitiesOne, viewSettings) {
    const self = this

    self.voterTest = new VoterTest(viewEntitiesOne)

    self.graphic = new VoterTestGraphic(self.voterTest, screen, simOptions, viewEntitiesOne, viewSettings)

    viewEntitiesOne.dragm.add(self)
}
