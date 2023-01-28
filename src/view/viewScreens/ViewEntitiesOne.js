/** @module */

import CandidateViewList from '../vizCandidates/CandidateViewList.js'
import VoterViewList from '../vizVoters/VoterViewList.js'
import ViewBase from './ViewBase.js'
import addAllocation from '../viz/addAllocation.js'
import TestVoterView from '../vizTestVoter/TestVoterView.js'
import getTestGeometry from '../../sim/sim/getTestGeometry.js'
import voteCasters from '../../election/voteCasters/voteCasters.js'

/**
 * Draw entities: voters, candidates, test voters.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {ViewSettings} viewSettings
 * @constructor
 */
export default function ViewEntitiesOne(entities, screen, menu, changes, simOptions, electionOptions, viewMode, viewSettings, viewChanges) {
    const self = this

    viewMode.viewModes.one.attach(self)

    ViewBase.call(self, screen, changes, viewSettings)

    const { candidateList, voterShapeList } = entities

    // Entities //
    const candidateViewList = new CandidateViewList(viewSettings, candidateList, screen, simOptions, electionOptions)
    const voterViewList = new VoterViewList(viewSettings, voterShapeList, screen, simOptions)
    candidateViewList.attachNewG(self.dragm)
    voterViewList.attachNewG(self.dragm)

    self.testVoterView = new TestVoterView(screen, simOptions, self, viewSettings)

    // Main State Machine Functions //

    const superEnter = self.enter
    self.enter = () => {
        superEnter()

        voterViewList.updateViewXY()
        candidateViewList.updateViewXY()
        self.testVoterView.graphic.updateViewXY()
    }

    self.exit = () => {
        candidateViewList.unsetCandidateWins()
        self.testVoterView.testVoter.setCommand.exists(0)
    }

    self.update = (simData) => {
        if (changes.checkNone()) return

        if (changes.check(['dimensions'])) {
            self.exit()
            self.enter()
        }

        if (changes.check(['draggables'])) {
            // this will trigger when undo moves entities
            voterViewList.updateViewXY()
            candidateViewList.updateViewXY()
        }

        const { electionResults } = simData
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
        self.testVoterView.graphic.start(p)
    }
    self.testVoteView = () => {
        const geometry = getTestGeometry(self.testVoterView.testVoter, candidateList, simOptions)
        const vote = voteCasters[electionOptions.voteCasterName].castTestVote(geometry)
        self.testVoterView.graphic.update(vote, candidateList)
        viewChanges.add(['testVote'])
        return vote
    }

    self.renderForeground = () => {
        voterViewList.renderForeground()
        candidateViewList.renderForeground()
        self.testVoterView.graphic.renderForeground()
    }
    self.clearForeground = () => {
        screen.clearForeground()
    }
}
