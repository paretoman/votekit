/** @module */

import VizSample from '../viz/VizSample.js'
import VizSampleDensity1D from '../viz/VizSampleDensity1D.js'
import VizSampleDensity2D from '../viz/VizSampleDensity2D.js'
import ViewBase from './ViewBase.js'
import VoterRendererList from '../voters/VoterRendererList.js'
import CandidateDnRendererList from '../candidateDns/CandidateDnRendererList.js'

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
export default function ViewVizSample(entities, screen, menu, changes, sim, viewSettings) {
    const self = this

    sim.sims.sample.pub.attach(self)

    ViewBase.call(self, screen, changes, viewSettings)

    // Entities //
    const { candidateDnList, voterShapeList } = entities

    const voterRendererList = new VoterRendererList(voterShapeList)
    const canDnRendererList = new CandidateDnRendererList(candidateDnList)

    // Strategies //

    let vizSample
    function enterStrategy() {
        const doDensity = true // TODO : make into an option, perhaps
        const VizSampleDensity = (sim.election.dimensions === 1)
            ? VizSampleDensity1D
            : VizSampleDensity2D
        const VizSampleStrat = (doDensity) ? VizSampleDensity : VizSample
        vizSample = new VizSampleStrat(voterRendererList, canDnRendererList, screen, changes, sim)
    }
    enterStrategy()

    // Main State Machine Functions //

    self.enter = () => {
        enterStrategy()
    }

    self.exit = () => {
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

    self.render = () => {
        vizSample.render()
    }
}
