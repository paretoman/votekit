/** @module */

import CandidateSim from '../../candidates/CandidateSim.js'
import CandidateSimList from '../../candidates/CandidateSimList.js'
import VoterSimList from '../../voters/VoterSimList.js'
import SimBase from './SimBase.js'
import VoterSim from '../../voters/VoterSim.js'
import VizOne2D from '../../viz/VizOne2D.js'

/**
 * Simulate one election with
 *   candidates in defined positions, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {OneElection} oneElection
 * @param {Sim} sim
 * @constructor
 */
export default function SimOne2D(screen, menu, changes, oneElection, sim) {
    const self = this

    SimBase.call(self, screen, changes, sim)

    const oneVoters = new VoterSimList(sim)

    const candidateSimList = new CandidateSimList(sim)

    self.addSimCandidate = (candidate) => {
        candidateSimList.newCandidate(new CandidateSim(candidate, self.dragm))
    }

    self.addSimVoterCircle = (voterShape) => {
        oneVoters.newVoterGroup(new VoterSim(voterShape, self.dragm, screen))
    }

    const vizOne2D = new VizOne2D(oneVoters, candidateSimList, screen)

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        sim.simAddCandidates.canButton.show()
        sim.election.setDimensions(2)
        oneVoters.updateXY()
        candidateSimList.updateXY()
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
        oneElection.updateTallies(oneVoters, candidateSimList)
        vizOne2D.update()
        sim.testVoter.update()
        screen.clear()
        self.render()
    }

    self.testVote = () => oneElection.testVote(sim.testVoter, candidateSimList)

    self.render = () => {
        vizOne2D.render()
    }
    self.renderForeground = () => {
        // sampleElections.renderForeground()
        oneVoters.renderForeground()
        candidateSimList.renderForeground()
        sim.testVoter.renderForeground()
    }
}
