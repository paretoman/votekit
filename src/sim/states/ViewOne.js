/** @module */

import CandidateViewList from '../../candidates/CandidateViewList.js'
import VoterViewList from '../../voters/VoterViewList.js'
import ViewBase from './ViewBase.js'
import addAllocation from '../../viz/addAllocation.js'
import VoterTest from '../../voters/VoterTest.js'

/**
 * Draw entities: voters, candidates, test voters.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Sim} sim
 * @param {ViewGhosts} viewGhosts
 * @constructor
 */
export default function ViewOne(entities, screen, menu, changes, sim, viewGhosts) {
    const self = this

    sim.sims.one.pub.attach(self)

    ViewBase.call(self, screen, changes, viewGhosts)

    const { candidateList, voterShapeList } = entities

    // Entities //
    const candidateViewList = new CandidateViewList(viewGhosts, candidateList, screen, sim.election)
    const voterViewList = new VoterViewList(viewGhosts, voterShapeList, screen, sim.election)
    candidateViewList.attachNewG(self.dragm)
    voterViewList.attachNewG(self.dragm)

    self.voterTest = new VoterTest(screen, sim, self, viewGhosts)

    // Main State Machine Functions //

    const superEnter = self.enter
    self.enter = () => {
        superEnter()

        candidateList.canButton.show()
        voterViewList.updateViewXY()
        candidateViewList.updateViewXY()
        self.voterTest.updateViewXY()
    }

    self.exit = () => {
        candidateViewList.unsetCandidateWins() // clean up fractions
        candidateList.canButton.hide()
        self.voterTest.setE(0)
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

    // Test Point
    self.clickEmpty = (p) => {
        self.voterTest.start(p)
    }
    self.testVoteView = () => {
        const vote = sim.election.testVoteE(self.voterTest, candidateList)
        self.voterTest.update(vote, candidateList)
        return vote
    }

    self.renderForeground = () => {
        voterViewList.renderForeground()
        candidateViewList.renderForeground()
        self.voterTest.renderForeground()
    }
}
