/** @module */

import OneVoterCircle from '../../voters/OneVoterCircle.js'
import SimCandidate from '../../candidates/SimCandidate.js'
import SimCandidateList from '../../candidates/SimCandidateList.js'
import SimVoterList from '../../voters/SimVoterList.js'
import SimBase from './SimBase.js'

/**
 * Simulate one election with
 *   candidates in defined positions, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {DraggableManager} dragm
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Election} election
 */
export default function SimOne(screen, dragm, menu, changes, oneElection) {
    const self = this

    SimBase.call(self, dragm, screen)

    const oneVoters = new SimVoterList()

    const simCandidateList = new SimCandidateList()

    self.addSimCandidate = (candidate) => {
        simCandidateList.newCandidate(new SimCandidate(candidate, dragm))
    }

    self.addSimVoterCircle = (voterCircle) => {
        oneVoters.newVoterGroup(new OneVoterCircle(voterCircle, dragm, screen))
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
