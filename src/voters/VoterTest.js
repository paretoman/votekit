import CircleGraphic from '../vizEntities/CircleGraphic.js'
import hideOnClickOutside from '../tooltips/hideOnClickOutside.js'
import tooltipForTestVoter from '../tooltips/tooltipForTestVoter.js'
import colorBlender, { rgbToString } from '../viz/colorBlender.js'

export default function VoterTest(screen, views, sim, view) {
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
        view.testVote()
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
        view.voterTest.setE(1)
        view.voterTest.setXY(p)
        hideOnClickOutside(screen.wrap, removeTestPoint)
    }
    function removeTestPoint() {
        view.voterTest.setE(0)
    }

    // Dragging

    self.color = '#999'
    const circle = new CircleGraphic(self, 9, screen, sim.election, view)
    self.circle = circle

    views.one.dragm.add(self)
    // views.sample.dragm.add(self)

    // Rendering

    let tooltip = {}

    self.update = (vote, candidateList) => {
        // who would this test point vote for?
        if (vote === undefined) return null

        const canList = candidateList.getCandidates()
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
        const vote = view.testVote()
        if (vote === null) return

        if (tooltip.box) tooltip.box.remove()
        tooltip = tooltipForTestVoter(self, screen)
        tooltip.update(vote, self.color, self.colorSet)
    }

    self.renderForeground = () => {
        // handle
        if (self.exists || view.showGhosts) {
            circle.render()
        }
    }
}
