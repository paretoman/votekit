/** @module */

import CandidateViewList from '../candidates/CandidateViewList.js'
import VoterViewList from '../voters/VoterViewList.js'
import ViewBase from './ViewBase.js'
import addAllocation from '../viz/addAllocation.js'
import VoterTestView from '../voters/VoterTestView.js'

/**
 * Draw entities: voters, candidates, test voters.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Sim} sim
 * @param {ViewSettings} viewSettings
 * @constructor
 */
export default function ViewOne(entities, screen, menu, changes, sim, viewSM, viewSettings) {
    const self = this

    viewSM.views.one.pub.attach(self)

    ViewBase.call(self, screen, changes, viewSettings)

    const { candidateList, voterShapeList } = entities
    const { election } = sim

    // Entities //
    const candidateViewList = new CandidateViewList(viewSettings, candidateList, screen, election)
    const voterViewList = new VoterViewList(viewSettings, voterShapeList, screen, election)
    candidateViewList.attachNewG(self.dragm)
    voterViewList.attachNewG(self.dragm)

    self.voterTestView = new VoterTestView(screen, sim, self, viewSettings)

    // Main State Machine Functions //

    const superEnter = self.enter
    self.enter = () => {
        superEnter()

        candidateList.canButton.show()
        voterViewList.updateViewXY()
        candidateViewList.updateViewXY()
        self.voterTestView.graphic.updateViewXY()
    }

    self.exit = () => {
        candidateViewList.unsetCandidateWins() // clean up fractions
        candidateList.canButton.hide()
        self.voterTestView.voterTest.setE(0)
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
        self.voterTestView.graphic.start(p)
    }
    self.testVoteView = () => {
        const vote = election.testVoteE(self.voterTestView.voterTest, candidateList)
        self.voterTestView.graphic.update(vote, candidateList)
        return vote
    }

    self.renderForeground = () => {
        voterViewList.renderForeground()
        candidateViewList.renderForeground()
        self.voterTestView.graphic.renderForeground()
    }
    self.clearForeground = () => {
        screen.clearForeground()
    }
}
