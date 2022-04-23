/** @module */

import SimCandidate from '../../candidates/SimCandidate.js'
import SimCandidateList from '../../candidates/SimCandidateList.js'
import VoterSimList from '../../voters/VoterSimList.js'
import SimBase from './SimBase.js'
import VoterSim from '../../voters/VoterSim.js'
import VizOne1D from '../../viz/VizOne1D.js'

/**
 * Simulate one election with
 *   candidates in defined positions, and
 *   voters in a distribution that will be summed over.
 * Plan:
 * * SimOneDOne is a subclass of SimBase.
 * * VizOne1D is a subclass of VoterSim.
 * * Voronoi1D is called by VizOne1D.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Election} election
 * @param {Sim} sim
 * @constructor
 */
export default function SimOneDOne(screen, menu, changes, oneElection, sim) {
    const self = this

    SimBase.call(self, screen, changes, sim)

    const oneVoters = new VoterSimList(sim)

    const simCandidateList = new SimCandidateList(sim)

    self.addSimCandidate = (candidate) => {
        simCandidateList.newCandidate(new SimCandidate(candidate, self.dragm))
    }

    self.addSimVoterCircle = (voterShape) => {
        oneVoters.newVoterGroup(new VoterSim(voterShape, self.dragm, screen))
    }

    const vizOne1D = new VizOne1D(screen)

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        sim.simAddCandidates.canButton.show()
        sim.election.setDimensions(1)
        oneVoters.updateXY()
        simCandidateList.updateXY()
        sim.testVoter.updateXY()
    }

    self.exit = () => {
        sim.simAddCandidates.canButton.hide()
        sim.testVoter.setE(0)
    }

    self.update = () => {
        if (changes.checkNone()) return
        // clear changes, reset to []
        changes.clear()
        oneElection.updateTallies(oneVoters, simCandidateList)
        vizOne1D.update(oneVoters, simCandidateList)
        sim.testVoter.update()
        screen.clear()
        self.render()
    }

    self.testVote = () => oneElection.testVote(sim.testVoter, simCandidateList)

    self.render = () => {
        vizOne1D.render()
    }
    self.renderForeground = () => {
        // sampleElections.renderForeground()
        oneVoters.renderForeground()
        simCandidateList.renderForeground()
        sim.testVoter.renderForeground()
    }
}
