/** @module */

import CandidateDnSimList from '../../candidateDns/CandidateDnSimList.js'
import VoterSimList from '../../voters/VoterSimList.js'
import VizSample from '../../viz/VizSample.js'
import VizSampleDensity1D from '../../viz/VizSampleDensity1D.js'
import VizSampleDensity2D from '../../viz/VizSampleDensity2D.js'
import jupyterUpdate, { jupyterClear } from '../../environments/jupyter.js'
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
export default function ViewSample(screen, menu, changes, sim, view) {
    const self = this

    ViewBase.call(self, screen, changes, view)

    // Entities //

    const candidateDnSimList = new CandidateDnSimList(view, sim, changes, screen, sim.election)
    const voterSimList = new VoterSimList(view, sim, screen)

    candidateDnSimList.attachNewG(self.dragm)
    voterSimList.attachNewG(self.dragm)

    // Strategies //

    let vizSample
    function enterStrategy() {
        const doDensity = true // TODO : make into an option, perhaps
        const VizSampleDensity = (sim.election.dimensions === 1)
            ? VizSampleDensity1D
            : VizSampleDensity2D
        const VizSampleStrat = (doDensity) ? VizSampleDensity : VizSample
        vizSample = new VizSampleStrat(voterSimList, candidateDnSimList, screen, changes, sim)
    }

    // Main State Machine Functions //

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        sim.candidateDnList.canDnButton.show()
        enterStrategy()
        voterSimList.updateXY()
        candidateDnSimList.updateXY()
    }

    self.exit = () => {
        sim.candidateDnList.canDnButton.hide()
    }

    self.update = (addResult) => {
        // Update players. Run an election. Get result. Visualize result.
        // The election handles any changes.
        // The electionResults communicates how to visualize the election.

        jupyterClear()
        jupyterUpdate({ addResult })
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
        voterSimList.renderForeground()
        candidateDnSimList.renderForeground()
    }
}
