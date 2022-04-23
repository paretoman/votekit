/** @module */

import SimCandidate from '../../candidates/SimCandidate.js'
import SimCandidateList from '../../candidates/SimCandidateList.js'
import SimVoterList from '../../voters/SimVoterList.js'
import SimBase from './SimBase.js'
import SimVoter from '../../voters/SimVoter.js'
import OneViz from '../../viz/OneViz.js'

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
export default function SimOne(screen, menu, changes, oneElection, sim) {
    const self = this

    SimBase.call(self, screen, changes, sim)

    const oneVoters = new SimVoterList(sim)

    const simCandidateList = new SimCandidateList(sim)

    self.addSimCandidate = (candidate) => {
        simCandidateList.newCandidate(new SimCandidate(candidate, self.dragm))
    }

    self.addSimVoterCircle = (voterShape) => {
        oneVoters.newVoterGroup(new SimVoter(voterShape, self.dragm, screen))
    }

    const oneViz = new OneViz(screen)

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        sim.simAddCandidates.canButton.show()
        sim.election.setDimensions(2)
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
        oneViz.update(oneVoters, simCandidateList)
        sim.testVoter.update()
        screen.clear()
        self.render()
    }

    self.testVote = () => oneElection.testVote(sim.testVoter, simCandidateList)

    self.render = () => {
        oneViz.render()
    }
    self.renderForeground = () => {
        // sampleElections.renderForeground()
        oneVoters.renderForeground()
        simCandidateList.renderForeground()
        sim.testVoter.renderForeground()
    }
}
