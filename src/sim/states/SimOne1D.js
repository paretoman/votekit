/** @module */

import CandidateSim from '../../candidates/CandidateSim.js'
import CandidateSimList from '../../candidates/CandidateSimList.js'
import VoterSimList from '../../voters/VoterSimList.js'
import SimBase from './SimBase.js'
import VoterSim from '../../voters/VoterSim.js'
import VizOne1D from '../../viz/VizOne1D.js'

/**
 * Simulate one election with
 *   candidates in defined positions, and
 *   voters in a distribution that will be summed over.
 * Plan:
 * * SimOne1D is a subclass of SimBase.
 * * VizOne1D is a subclass of VoterSim.
 * * Voronoi1D is called by VizOne1D.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Election} election
 * @param {Sim} sim
 * @constructor
 */
export default function SimOne1D(screen, menu, changes, electionOne, sim) {
    const self = this

    SimBase.call(self, screen, changes, sim)

    const oneVoters = new VoterSimList(sim)

    const candidateSimList = new CandidateSimList(sim)

    self.addSimCandidate = (candidate) => {
        candidateSimList.newCandidate(new CandidateSim(candidate, self.dragm))
    }

    self.addSimVoterCircle = (voterShape) => {
        oneVoters.newVoterSim(new VoterSim(voterShape, self.dragm, screen))
    }

    const vizOne1D = new VizOne1D(oneVoters, candidateSimList, screen)

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        sim.candidateAdd.canButton.show()
        sim.election.setDimensions(1)
        oneVoters.updateXY()
        candidateSimList.updateXY()
        sim.voterTest.updateXY()
    }

    self.exit = () => {
        sim.candidateAdd.canButton.hide()
        sim.voterTest.setE(0)
    }

    self.update = () => {
        if (changes.checkNone()) return
        // clear changes, reset to []
        changes.clear()
        electionOne.updateTallies(oneVoters, candidateSimList)
        vizOne1D.update()
        sim.voterTest.update()
        screen.clear()
        self.render()
    }

    self.testVote = () => electionOne.testVote(sim.voterTest, candidateSimList)

    self.render = () => {
        vizOne1D.render()
    }
    self.renderForeground = () => {
        // electionSample.renderForeground()
        oneVoters.renderForeground()
        candidateSimList.renderForeground()
        sim.voterTest.renderForeground()
    }
}
