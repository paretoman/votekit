/** @module */

import CandidateViewList from '../candidates/CandidateViewList.js'
import VoterViewList from '../voters/VoterViewList.js'
import ViewBase from './ViewBase.js'
import addAllocation from '../viz/addAllocation.js'
import VoterTestView from '../voters/VoterTestView.js'
import getTestGeometry from '../sim/getTestGeometry.js'
import voteCasters from '../castVotes/voteCasters.js'

/**
 * Draw entities: voters, candidates, test voters.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {ViewSettings} viewSettings
 * @constructor
 */
export default function ViewOne(entities, screen, menu, changes, simOptions, electionOptions, viewSM, viewSettings) {
    const self = this

    viewSM.views.one.pub.attach(self)

    ViewBase.call(self, screen, changes, viewSettings)

    const { candidateList, voterShapeList } = entities

    // Entities //
    const candidateViewList = new CandidateViewList(viewSettings, candidateList, screen, simOptions, electionOptions)
    const voterViewList = new VoterViewList(viewSettings, voterShapeList, screen, simOptions)
    candidateViewList.attachNewG(self.dragm)
    voterViewList.attachNewG(self.dragm)

    self.voterTestView = new VoterTestView(screen, simOptions, self, viewSettings)

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

    self.update = (simData) => {
        const { electionResults } = simData
        if (changes.checkNone()) return

        if (changes.check(['draggables'])) {
            // this will trigger when undo moves entities
            voterViewList.updateViewXY()
            candidateViewList.updateViewXY()
        }

        const { error } = electionResults
        if (error === undefined) {
            addAllocation(electionResults)
            const { votes, socialChoiceResults } = electionResults
            candidateViewList.setCandidateWins(socialChoiceResults.allocation)
            candidateViewList.setCandidateFractions(votes.tallyFractions)
        }

        self.testVoteView()

        self.clearForeground()
        self.renderForeground()
    }

    // Test Point
    self.clickEmpty = (p) => {
        self.voterTestView.graphic.start(p)
    }
    self.testVoteView = () => {
        const geometry = getTestGeometry(self.voterTestView.voterTest, candidateList, simOptions)
        const vote = voteCasters[electionOptions.voteCasterName].castTestVote(geometry)
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
