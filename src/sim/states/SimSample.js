/** @module */

import CandidateDnSimList from '../../candidateDns/CandidateDnSimList.js'
import VoterSimList from '../../voters/VoterSimList.js'
import SimBase from './SimBase.js'
import VizSample from '../../viz/VizSample.js'
import VizSampleDensity1D from '../../viz/VizSampleDensity1D.js'
import VizSampleDensity2D from '../../viz/VizSampleDensity2D.js'
import jupyterUpdate, { jupyterClear } from '../../environments/jupyter.js'

/**
 * Simulate many sample elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {ElectionSample} electionSample
 * @param {ElectionSampleGeo} electionSampleGeo
 * @param {VoterGeo} voterGeo
 * @param {Sim} sim
 * @constructor
 */
export default function SimSample(
    screen,
    menu,
    changes,
    election,
    electionSample,
    electionSampleGeo,
    voterGeo,
    sim,
) {
    const self = this

    SimBase.call(self, screen, changes, sim)

    // Entities //

    const candidateDnSimList = new CandidateDnSimList(sim, changes, screen, election)
    const voterSimList = new VoterSimList(sim, screen)

    candidateDnSimList.attachNewG(self.dragm)
    voterSimList.attachNewG(self.dragm)

    changes.add(['districts'])

    // Strategies //

    let electionStrategy
    let vizSample
    function enterStrategy() {
        electionStrategy = (sim.geo) ? electionSampleGeo : electionSample

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

    self.update = () => {
        // Update players. Run an election. Get result. Visualize result.
        // The election handles any changes.
        // The electionResults communicates how to visualize the election.

        jupyterClear()
        if (sim.geo) voterGeo.update()
        sim.candidateDnList.update()
        const { dimensions } = sim.election
        const addResult = electionStrategy
            .update(sim.voterShapeList, sim.candidateDnList, changes, dimensions)
        jupyterUpdate({ addResult })
        vizSample.update(addResult)
        changes.clear()

        const { pointsChanged } = addResult
        if (pointsChanged) {
            screen.clear()
            self.render()
        }
    }

    self.render = () => {
        vizSample.render()
    }
    self.renderForeground = () => {
        voterSimList.renderForeground()
        candidateDnSimList.renderForeground()
    }
}
