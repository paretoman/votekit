/** @module */

import SampleVoterCircle from '../entities/SampleVoterCircle.js'
import SimVoterList from '../entities/SimVoterList.js'

/**
 * Simulate many sample elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {DraggableManager} dragm
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {SimElection} sampleElections
 */
export default function SimSample(screen, dragm, menu, changes, sampleElections, sampleCandidates) {
    const self = this

    const sampleVoters = new SimVoterList()

    self.addSimVoterCircle = (voterCircle) => {
        sampleVoters.newVoterGroup(new SampleVoterCircle(voterCircle, screen))
    }

    self.update = () => {
        if (changes.checkNone()) {
            const noChange = sampleElections.addSim(sampleVoters, sampleCandidates)
            if (!noChange) {
                changes.clear()
                // changed, so re-render
                screen.clear()
                self.render()
            }
        } else {
            // clear changes, reset to []
            changes.clear()
            sampleCandidates.startSampler()
            sampleElections.startSim()
            screen.clear()
            self.render()
        }
    }

    self.render = () => {
        sampleElections.render()
        sampleVoters.render()
        sampleCandidates.render()
    }
    self.renderForeground = () => {
        sampleVoters.renderForeground()
        sampleCandidates.renderForeground()
    }

    self.enter = () => {}

    self.exit = () => {}
}
