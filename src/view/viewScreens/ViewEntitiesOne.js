/** @module */

import voteCasters from '@paretoman/votekit-vote-casters'
import CandidateViewList from '../vizCandidates/CandidateViewList.js'
import VoterViewList from '../vizVoters/VoterViewList.js'
import ViewBase from './ViewBase.js'
import addAllocation from '../viz/addAllocation.js'
import TestVoterView from '../vizTestVoter/TestVoterView.js'
import getTestGeometry from '../../sim/geometry/getTestGeometry.js'
import getTallyFractions from '../viz/getTallyFractions.js'
import getResultsPhaseOptions from '../phase/getResultsPhaseOptions.js'
import getPhaseResults from '../phase/getPhaseResults.js'

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
    const voterViewList = new VoterViewList(viewSettings, voterShapeList, screen, simOptions, electionOptionsMan)
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

        const sequenceResults = simData.geoResults.scResultsByDistrict[0]
        const { error } = sequenceResults
        if (error === undefined) {
            const phaseResults = getPhaseResults(sequenceResults, simOptions)
            if (phaseResults.error === undefined) {
                const numCans = sequenceResults.geometry.canPoints.length
                const tf = Array(numCans)
                const al = Array(numCans)

                addAllocation(phaseResults)
                const { allocation } = phaseResults.socialChoiceResults

                const { votes } = phaseResults
                const tallyFractions = getTallyFractions(votes)

                // map results to original candidate indices
                const { canLabels } = phaseResults.geometry
                for (let i = 0; i < canLabels.length; i++) {
                    const index = canLabels[i]
                    tf[index] = tallyFractions[i]
                    al[index] = allocation[i]
                }
                candidateViewList.setCandidateFractions(tf)
                candidateViewList.setCandidateWins(al)
            }
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
        const optionsBag = electionOptionsMan.getOptions()

        const resultsPhaseOptions = getResultsPhaseOptions(optionsBag, simOptions)
        const { voteCasterName } = resultsPhaseOptions

        // todo: check this to see if it is correct. I'm not sure if a closed primary would work well here.
        const testGeometry = getTestGeometry(self.testVoterView.testVoter, candidateList, simOptions)
        const { canPoints, voterPoint, dimensions } = testGeometry
        const verbosity = 3

        const vote = voteCasters[voteCasterName].castPoint(canPoints, voterPoint, dimensions, verbosity)

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
