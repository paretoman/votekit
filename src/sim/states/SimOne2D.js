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
 * @param {ElectionOne} electionOne
 * @param {Sim} sim
 * @constructor
 */
export default function SimOne2D(screen, menu, changes, electionOne, sim) {
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

    const vizOne2D = new VizOne2D(oneVoters, candidateSimList, screen, sim)

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        screen.showMaps()
        sim.candidateAdd.canButton.show()
        sim.election.setDimensions(2)
        oneVoters.updateXY()
        candidateSimList.updateXY()
        sim.voterTest.updateXY()
    }

    self.exit = () => {
        screen.hideMaps()
        sim.candidateAdd.canButton.hide()
        sim.voterTest.setE(0)
    }

    self.update = () => {
        if (changes.checkNone()) return
        // clear changes, reset to []
        changes.clear()
        const votes = electionOne.updateTallies(oneVoters, candidateSimList)
        vizOne2D.update(votes)
        sim.voterTest.update()
        screen.clear()
        screen.clearMaps()
        self.render()
    }

    self.testVote = () => electionOne.testVote(sim.voterTest, candidateSimList)

    self.render = () => {
        vizOne2D.render()
    }
    self.renderForeground = () => {
        // electionSample.renderForeground()
        oneVoters.renderForeground()
        candidateSimList.renderForeground()
        sim.voterTest.renderForeground()
    }
}
