/** @module */

import SimCandidateDistributionList from '../entities/SimCandidateDistributionList.js'
import SimCandidateDistribution from '../entities/SimCandidateDistribution.js'
import SampleVoterCircle from '../entities/SampleVoterCircle.js'
import SimVoterList from '../entities/SimVoterList.js'
import SimBase from './SimBase.js'

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

    SimBase.call(self, dragm)

    const simCandidateList = new SimCandidateDistributionList()

    self.addSimCandidateDistribution = (canDn) => {
        simCandidateList.newCandidate(new SimCandidateDistribution(canDn, dragm))
    }

    const sampleVoters = new SimVoterList()

    self.addSimVoterCircle = (voterCircle) => {
        sampleVoters.newVoterGroup(new SampleVoterCircle(voterCircle, dragm, screen))
    }

    self.update = () => {
        if (changes.checkNone()) {
            const noChange = sampleElections.addSim(sampleVoters, simCandidateList)
            if (!noChange) {
                changes.clear()
                // changed, so re-render
                screen.clear()
                self.render()
            }
        } else {
            // clear changes, reset to []
            changes.clear()
            simCandidateList.startSampler()
            sampleElections.startSim()
            screen.clear()
            self.render()
        }
    }

    self.render = () => {
        sampleElections.render()
        sampleVoters.render()
        simCandidateList.render()
    }
    self.renderForeground = () => {
        sampleVoters.renderForeground()
        simCandidateList.renderForeground()
    }
}
