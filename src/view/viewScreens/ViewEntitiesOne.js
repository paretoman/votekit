/** @module */

import CandidateViewList from '../vizCandidates/CandidateViewList.js'
import VoterViewList from '../vizVoters/VoterViewList.js'
import ViewBase from './ViewBase.js'
import addAllocation from '../viz/addAllocation.js'
import TestVoterView from '../vizTestVoter/TestVoterView.js'
import getTestGeometry from '../../sim/geometry/getTestGeometry.js'
import voteCasters from '../../election/src/voteCasters/voteCasters/voteCasters.js'
import getTallyFractions from '../viz/getTallyFractions.js'

/**
 * Draw entities: voters, candidates, test voters.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {ViewSettings} viewSettings
 * @constructor
 */
export default function ViewEntitiesOne(entities, screen, menu, changes, simOptions, electionOptionsMan, viewMode, viewSettings, viewChanges) {
    const self = this

    viewMode.viewModes.one.attach(self)

    ViewBase.call(self, screen, changes, viewSettings)

    const { candidateList, voterShapeList } = entities

    // Entities //
    const candidateViewList = new CandidateViewList(viewSettings, candidateList, screen, simOptions, electionOptionsMan)
    const voterViewList = new VoterViewList(viewSettings, voterShapeList, screen, simOptions)
    candidateViewList.attachNewG(self.dragm)
    voterViewList.attachNewG(self.dragm)

    self.testVoterView = new TestVoterView(screen, simOptions, self, viewSettings)

    // Main State Machine Functions //

    self.exit = () => {
        candidateViewList.unsetCandidateWins()
        self.testVoterView.testVoter.doSetCommand.exists(0)
    }

    self.update = (simData) => {
        if (changes.checkNone()) return

        if (changes.check(['dimensions'])) {
            self.exit()
            self.enter()
        }

        if (changes.check(['draggables', 'dimensions', 'mode'])) {
            voterViewList.updateViewXY()
            candidateViewList.updateViewXY()
            self.testVoterView.graphic.updateViewXY()
        }

        const { electionResults } = simData
        const { error } = electionResults
        if (error === undefined) {
            addAllocation(electionResults)
            const { votes, socialChoiceResults } = electionResults
            candidateViewList.setCandidateWins(socialChoiceResults.allocation)
            const tallyFractions = getTallyFractions(votes)
            candidateViewList.setCandidateFractions(tallyFractions)
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
        const electionOptions = electionOptionsMan.getOptions()
        const testGeometry = getTestGeometry(self.testVoterView.testVoter, candidateList, simOptions)
        const { canPoints, voterPoint, dimensions } = testGeometry
        const verbosity = 3
        const vote = voteCasters[electionOptions.voteCasterName].castPoint(canPoints, voterPoint, dimensions, verbosity)
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
