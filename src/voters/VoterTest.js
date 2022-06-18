import CircleGraphic from '../vizEntities/CircleGraphic.js'
import hideOnClickOutside from '../tooltips/hideOnClickOutside.js'
import tooltipForTestVoter from '../tooltips/tooltipForTestVoter.js'
import colorBlender, { rgbToString } from '../viz/colorBlender.js'

export default function VoterTest(screen, sims, sim) {
    const self = this

    // Position

    self.shape1 = {}
    self.shape2 = {}

    self.setAction = {}
    self.setAction.exists = (e) => {
        self.exists = e
    }
    self.setE = (e) => {
        self.setAction.exists(e)
    }

    self.setAction.shape2p = (p) => {
        self.shape2.x = p.x
        self.shape2.y = p.y
        if (sim.election.dimensions === 2) {
            self.x = p.x
            self.y = p.y
        }
    }
    self.setAction.shape1x = (p) => {
        self.shape1.x = p
        if (sim.election.dimensions === 1) {
            self.x = p
            self.y = 250
        }
    }
    self.setXY = (p) => {
        if (sim.election.dimensions === 1) {
            self.setAction.shape1x(p.x)
        } else {
            self.setAction.shape2p(p)
        }
        sim.testVote()
    }
    /** Do this when entering a state because x and y change. */
    self.updateXY = () => {
        if (sim.election.dimensions === 1) {
            self.setAction.shape1x(self.shape1.x)
        } else {
            self.setAction.shape2p({ x: self.shape2.x, y: self.shape2.y })
        }
    }

    // Initialize

    self.setAction.shape1x(0)
    self.setAction.shape2p({ x: 0, y: 0 })

    // Start displaying testvoter
    self.start = (p) => {
        sim.voterTest.setE(1)
        sim.voterTest.setXY(p)
        hideOnClickOutside(screen.wrap, removeTestPoint)
    }
    function removeTestPoint() {
        sim.voterTest.setE(0)
    }

    // Dragging

    self.color = '#999'
    const circle = new CircleGraphic(self, 9, screen)
    self.circle = circle

    sims.one.dragm.newCircleHandle(self, self.circle)
    sims.sample.dragm.newCircleHandle(self, self.circle)

    // Rendering

    let tooltip = {}

    self.update = (vote, candidateSimList) => {
        // who would this test point vote for?
        if (vote === undefined) return null

        const canList = candidateSimList.getCandidates()
        const colorSet = canList.map((can) => can.color)
        const colorSetRGBA = canList.map((can) => can.colorRGBA)
        self.colorSet = colorSet

        const { tallyFractions } = vote
        self.color = rgbToString(colorBlender(tallyFractions, colorSetRGBA))

        if (tooltip.box) {
            tooltip.update(vote, self.color, self.colorSet)
        }

        return vote
    }

    self.click = () => {
        const vote = sim.testVote()
        if (vote === null) return

        if (tooltip.box) tooltip.box.remove()
        tooltip = tooltipForTestVoter(self, screen)
        tooltip.update(vote, self.color, self.colorSet)
    }

    self.renderForeground = () => {
        // handle
        if (self.exists || sim.showGhosts) {
            circle.render()
        }
    }
}
