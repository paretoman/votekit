import CircleGraphic from '../vizEntities/CircleGraphic.js'
import hideOnClickOutside from '../tooltips/hideOnClickOutside.js'
import tooltipForTestVoter from '../tooltips/tooltipForTestVoter.js'
import colorBlender, { rgbToString } from '../viz/colorBlender.js'
import EntityGraphic from '../vizEntities/EntityGraphic.js'
import getTallyFractionsNameForVote from '../viz/getTallyFractionsNameForVote.js'

export default function TestVoterGraphic(testVoter, screen, simOptions, viewEntitiesOne, viewSettings) {
    const self = this

    // Start displaying testvoter
    self.start = (p) => {
        testVoter.doSetCommand.exists(1)
        self.setXYView(p)
        hideOnClickOutside(screen.wrap, removeTestPoint)
    }
    function removeTestPoint() {
        testVoter.doSetCommand.exists(0)
    }

    // Dragging

    const circle = new CircleGraphic(self, testVoter, 9, screen)
    self.circle = circle

    EntityGraphic.call(self, testVoter, simOptions)

    // Rendering

    let tooltip = {}

    self.update = (vote, candidateList) => {
        // who would this test point vote for?
        if (vote === undefined) return null

        const canList = candidateList.getEntities()
        const colorSet = canList.map((can) => can.color)
        const colorSetRGBA = canList.map((can) => can.colorRGBA)
        self.colorSet = colorSet

        const tallyName = getTallyFractionsNameForVote(vote)
        const tallyFractions = vote[tallyName]
        const color = rgbToString(colorBlender(tallyFractions, colorSetRGBA))
        testVoter.doSetCommand.color(color)

        if (tooltip.box) {
            tooltip.update(vote, self.colorSet)
        }

        return vote
    }

    self.click = () => {
        const vote = viewEntitiesOne.testVoteView()
        if (vote === null) return

        if (tooltip.box) tooltip.box.remove()
        tooltip = tooltipForTestVoter(self, testVoter, screen)
        tooltip.update(vote, self.colorSet)
    }

    self.renderForeground = () => {
        // handle
        if (testVoter.exists || viewSettings.showGhosts) {
            circle.render()
        }
    }
}
