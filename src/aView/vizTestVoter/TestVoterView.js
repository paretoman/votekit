import TestVoterGraphic from './TestVoterGraphic.js'
import TestVoter from './TestVoter.js'

export default function TestVoterView(screen, simOptions, viewEntitiesOne, viewSettings) {
    const self = this

    self.testVoter = new TestVoter(viewEntitiesOne)

    self.graphic = new TestVoterGraphic(self.testVoter, screen, simOptions, viewEntitiesOne, viewSettings)

    viewEntitiesOne.dragm.add(self)
}
