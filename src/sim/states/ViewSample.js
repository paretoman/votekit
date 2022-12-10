/** @module */

import CandidateDnViewList from '../../candidateDns/CandidateDnViewList.js'
import VoterViewList from '../../voters/VoterViewList.js'
import VizSample from '../../viz/VizSample.js'
import VizSampleDensity1D from '../../viz/VizSampleDensity1D.js'
import VizSampleDensity2D from '../../viz/VizSampleDensity2D.js'
import ViewBase from './ViewBase.js'

/**
 * Simulate many sample elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Sim} sim
 * @param {View} view
 * @constructor
 */
export default function ViewSample(entities, screen, menu, changes, sim, view) {
    const self = this

    ViewBase.call(self, screen, changes, view)

    // Entities //
    const { candidateDnList, voterShapeList } = entities

    const candidateDnViewList = new CandidateDnViewList(view, candidateDnList, screen, sim.election)
    const voterViewList = new VoterViewList(view, voterShapeList, screen, sim.election)

    candidateDnViewList.attachNewG(self.dragm)
    voterViewList.attachNewG(self.dragm)

    // Strategies //

    let vizSample
    function enterStrategy() {
        const doDensity = true // TODO : make into an option, perhaps
        const VizSampleDensity = (sim.election.dimensions === 1)
            ? VizSampleDensity1D
            : VizSampleDensity2D
        const VizSampleStrat = (doDensity) ? VizSampleDensity : VizSample
        vizSample = new VizSampleStrat(voterViewList, candidateDnViewList, screen, changes, sim)
    }

    // Main State Machine Functions //

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        candidateDnList.canDnButton.show()
        enterStrategy()
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

        vizSample.update(addResult)

        const { pointsChanged } = addResult
        if (pointsChanged) {
            screen.clear()
            self.render()
        }
    }

    self.testVoteView = () => null

    self.render = () => {
        vizSample.render()
    }
    self.renderForeground = () => {
        voterViewList.renderForeground()
        candidateDnViewList.renderForeground()
    }
}
