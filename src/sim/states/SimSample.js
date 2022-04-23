/** @module */

import SimCandidateDistributionList from '../../candidates/SimCandidateDistributionList.js'
import SimCandidateDistribution from '../../candidates/SimCandidateDistribution.js'
import Sample2DViz from '../../viz/Sample2DViz.js'
import VoterSimList from '../../voters/VoterSimList.js'
import SimBase from './SimBase.js'
import VoterSim from '../../voters/VoterSim.js'

/**
 * Simulate many sample elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {SimElection} sampleElections
 * @param {Sim} sim
 * @constructor
 */
export default function SimSample(screen, menu, changes, sampleElections, sim) {
    const self = this

    SimBase.call(self, screen, changes, sim)

    const simCandidateList = new SimCandidateDistributionList(sim)

    self.addSimCandidateDistribution = (canDn) => {
        simCandidateList.newCandidate(new SimCandidateDistribution(canDn, self.dragm))
    }

    const sampleVoters = new VoterSimList(sim)

    self.addSimVoterCircle = (voterShape) => {
        sampleVoters.newVoterGroup(new VoterSim(voterShape, self.dragm, screen))
    }

    const sample2DViz = new Sample2DViz(sampleVoters, screen)

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        sim.simAddCandidateDns.canDnButton.show()
        sim.election.setDimensions(2)
        sampleVoters.updateXY()
        simCandidateList.updateXY()
    }

    self.exit = () => {
        sim.simAddCandidateDns.canDnButton.hide()
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
        sample2DViz.render()
        simCandidateList.render()
    }
    self.renderForeground = () => {
        sampleVoters.renderForeground()
        simCandidateList.renderForeground()
    }
}
