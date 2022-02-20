/** @module */

import SampleVoterCircle from '../entities/SampleVoterCircle.js'
import CandidateDistribution from '../entities/CandidateDistribution.js'
import Voters from '../../election/Voters.js'
import SampleCandidates from '../../election/SampleCandidates.js'

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
export default function SimSample(screen, dragm, menu, changes, sampleElections) {
    const self = this

    const voters = new Voters()
    const sampleCandidates = new SampleCandidates()
    const cd = new CandidateDistribution(150, 150, 100, screen, dragm, sampleCandidates)
    const ci = new SampleVoterCircle(50, 150, 100, screen, dragm, voters)
    const ci2 = new SampleVoterCircle(250, 150, 100, screen, dragm, voters)

    self.clear = () => {
        sampleCandidates.clear()
        voters.clear()
    }

    self.update = () => {
        if (changes.checkNone()) {
            const noChange = sampleElections.addSim(voters, sampleCandidates)
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
        ci.render()
        ci2.render()
        cd.render()
    }
    self.renderForeground = () => {
        // sampleElections.renderForeground()
        ci.renderForeground()
        ci2.renderForeground()
        cd.renderForeground()
    }
}
