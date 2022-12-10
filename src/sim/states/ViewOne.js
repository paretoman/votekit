/** @module */

import CandidateViewList from '../../candidates/CandidateViewList.js'
import VoterViewList from '../../voters/VoterViewList.js'
import ViewBase from './ViewBase.js'
import addAllocation from '../../viz/addAllocation.js'

/**
 * Draw entities: voters, candidates, test voters.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Sim} sim
 * @param {View} view
 * @constructor
 */
export default function ViewOne(entities, screen, menu, changes, sim, view) {
    const self = this

    sim.sims.one.pub.attach(self)

    ViewBase.call(self, screen, changes, view)

    const { candidateList, voterShapeList } = entities

    // Entities //
    const candidateViewList = new CandidateViewList(view, candidateList, screen, sim.election)
    const voterViewList = new VoterViewList(view, voterShapeList, screen, sim.election)
    candidateViewList.attachNewG(self.dragm)
    voterViewList.attachNewG(self.dragm)

    // Main State Machine Functions //

    const superEnter = self.enter
    self.enter = () => {
        superEnter()

        candidateList.canButton.show()
        voterViewList.updateViewXY()
        candidateViewList.updateViewXY()
        view.voterTest.updateViewXY()
    }

    self.exit = () => {
        candidateViewList.unsetCandidateWins() // clean up fractions
        candidateList.canButton.hide()
        view.voterTest.setE(0)
    }

    self.update = (electionResults) => {
        if (changes.checkNone()) return

        if (changes.check(['draggables'])) {
            // this will trigger when undo moves entities
            voterViewList.updateViewXY()
            candidateViewList.updateViewXY()
        }

        const { error } = electionResults
        if (error === undefined) {
            if (sim.geo) {
                const { resultsStatewide, allocation } = electionResults
                candidateViewList.setCandidateWins(allocation)
                candidateViewList.setCandidateFractions(resultsStatewide.votes.tallyFractions)
            } else {
                const { tallyFractions, allocation } = addAllocation(electionResults)
                candidateViewList.setCandidateWins(allocation)
                candidateViewList.setCandidateFractions(tallyFractions)
            }
        }

        self.testVoteView()
    }

    self.testVoteView = () => {
        const vote = sim.election.testVoteE(view.voterTest, candidateList)
        view.voterTest.update(vote, candidateList)
        return vote
    }

    self.renderForeground = () => {
        voterViewList.renderForeground()
        candidateViewList.renderForeground()
        view.voterTest.renderForeground()
    }
}
