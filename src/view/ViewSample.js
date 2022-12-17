/** @module */

import CandidateDnViewList from '../candidateDns/CandidateDnViewList.js'
import VoterViewList from '../voters/VoterViewList.js'
import ViewBase from './ViewBase.js'

/**
 * Simulate many sample elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Sim} sim
 * @param {ViewSettings} viewSettings
 * @constructor
 */
export default function ViewSample(entities, screen, menu, changes, sim, view, viewSettings) {
    const self = this

    view.views.sample.pub.attach(self)

    ViewBase.call(self, screen, changes, viewSettings)

    // Entities //
    const { candidateDnList, voterShapeList } = entities

    // eslint-disable-next-line max-len
    const candidateDnViewList = new CandidateDnViewList(viewSettings, candidateDnList, screen, sim.election)
    const voterViewList = new VoterViewList(viewSettings, voterShapeList, screen, sim.election)

    candidateDnViewList.attachNewG(self.dragm)
    voterViewList.attachNewG(self.dragm)

    // Main State Machine Functions //

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        candidateDnList.canDnButton.show()
        voterViewList.updateViewXY()
        candidateDnViewList.updateViewXY()
    }

    self.exit = () => {
        candidateDnList.canDnButton.hide()
    }

    self.update = (addResult) => {
        // Update players. Run an election. Get result. Visualize result.
        // The election handles any changes.
        // The electionResults communicates how to visualize the election.

        if (changes.check(['rerender'])) {
            self.clearForeground()
            self.renderForeground()
            if (changes.numChanges === 1) return
        }

        if (changes.check(['draggables'])) {
            // this will trigger when undo moves entities
            voterViewList.updateViewXY()
            candidateDnViewList.updateViewXY()
        }

        const { pointsChanged, partyWinFraction } = addResult

        if (pointsChanged) {
            candidateDnViewList.setCandidateDnWins(partyWinFraction)
        }
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
