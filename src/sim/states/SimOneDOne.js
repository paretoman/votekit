/** @module */

import SimCandidate from '../../candidates/SimCandidate.js'
import SimCandidateList from '../../candidates/SimCandidateList.js'
import SimVoterList from '../../voters/SimVoterList.js'
import SimBase from './SimBase.js'
import OneDVoterBlock from '../../voters/OneDVoterBlock.js'

/**
 * Simulate one election with
 *   candidates in defined positions, and
 *   voters in a distribution that will be summed over.
 * Plan:
 * * SimOneDOne is a subclass of SimBase.
 * * OneDVoterBlock is a subclass of SimVoter.
 * * OneDVoronoi is a component of OneDVoterBlock.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Election} election
 * @param {Sim} sim
 * @constructor
 */
export default function SimOneDOne(screen, menu, changes, oneElection, sim) {
    const self = this

    SimBase.call(self, screen, changes)

    const oneVoters = new SimVoterList()

    const simCandidateList = new SimCandidateList()

    self.addSimCandidate = (candidate) => {
        simCandidateList.newCandidate(new SimCandidate(candidate, self.dragm))
    }

    self.addSimVoterCircle = (voterCircle) => {
        oneVoters.newVoterGroup(new OneDVoterBlock(voterCircle, self.dragm, screen))
    }

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        sim.simAddCandidates.canButton.show()
        sim.election.setDimensions(1)
        oneVoters.updateXY()
        simCandidateList.updateXY()
    }

    self.exit = () => {
        sim.simAddCandidates.canButton.hide()
    }

    self.update = () => {
        if (changes.checkNone()) return
        // clear changes, reset to []
        changes.clear()
        oneElection.updateTallies(oneVoters, simCandidateList)
        oneVoters.update(simCandidateList)
        screen.clear()
        self.render()
    }

    self.render = () => {
        oneVoters.render()
    }
    self.renderForeground = () => {
        // sampleElections.renderForeground()
        oneVoters.renderForeground()
        simCandidateList.renderForeground()
    }
}
