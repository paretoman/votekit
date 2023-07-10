/** @module */

import CandidateDnViewList from '../vizCandidateDns/CandidateDnViewList.js'
import VoterViewList from '../vizVoters/VoterViewList.js'
import ViewBase from './ViewBase.js'

/**
 * Simulate many sample elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {ViewSettings} viewSettings
 * @constructor
 */
export default function ViewEntitiesSample(entities, screen, menu, changes, simOptions, electionOptionsMan, viewMode, viewSettings) {
    const self = this

    viewMode.viewModes.sample.attach(self)

    ViewBase.call(self, screen, changes, viewSettings)

    // Entities //
    const { candidateDnList, voterShapeList } = entities

    // eslint-disable-next-line max-len
    const candidateDnViewList = new CandidateDnViewList(viewSettings, candidateDnList, screen, simOptions, electionOptionsMan)
    const voterViewList = new VoterViewList(viewSettings, voterShapeList, screen, simOptions, electionOptionsMan)

    candidateDnViewList.attachNewG(self.dragm)
    voterViewList.attachNewG(self.dragm)

    // Main State Machine Functions //

    self.update = (simData) => {
        const { samplingResult } = simData
        // Update players. Run an election. Get result. Visualize result.
        // The election handles any changes.
        // The sequenceResults communicates how to visualize the election.

        if (changes.check(['draggables', 'dimensions', 'mode'])) {
            voterViewList.updateViewXY()
            candidateDnViewList.updateViewXY()
        }

        const { pointsChanged, partyWinFraction } = samplingResult

        if (pointsChanged) {
            candidateDnViewList.setCandidateDnWins(partyWinFraction)
        }

        self.clearForeground()
        self.renderForeground()
    }

    self.clickEmpty = () => { }
    self.testVoteView = () => null

    self.renderForeground = () => {
        voterViewList.renderForeground()
        candidateDnViewList.renderForeground()
    }

    self.clearForeground = () => {
        screen.clearForeground()
    }
}
