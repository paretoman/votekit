/** @module */

import SimCandidateDistributionList from '../../candidates/SimCandidateDistributionList.js'
import SimCandidateDistribution from '../../candidates/SimCandidateDistribution.js'
import SampleVoterCircle from '../../voters/SampleVoterCircle.js'
import SimVoterList from '../../voters/SimVoterList.js'
import SimBase from './SimBase.js'

/**
 * Simulate many sample elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {SimElection} sampleElections
 * @param {Object} canDnButton - a button that lets us add a candidateDistribution
 * @constructor
 */
export default function SimSample(screen, menu, changes, sampleElections, canDnButton) {
    const self = this

    SimBase.call(self, screen, changes)

    const simCandidateList = new SimCandidateDistributionList()

    self.addSimCandidateDistribution = (canDn) => {
        simCandidateList.newCandidate(new SimCandidateDistribution(canDn, self.dragm))
    }

    const sampleVoters = new SimVoterList()

    self.addSimVoterCircle = (voterCircle) => {
        sampleVoters.newVoterGroup(new SampleVoterCircle(voterCircle, self.dragm, screen))
    }

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        canDnButton.show()
    }

    self.exit = () => {
        canDnButton.hide()
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
