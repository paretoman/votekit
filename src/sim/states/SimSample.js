/** @module */

import CandidateDnSimList from '../../candidateDns/CandidateDnSimList.js'
import CandidateDnSim from '../../candidateDns/CandidateDnSim.js'
import VoterSimList from '../../voters/VoterSimList.js'
import SimBase from './SimBase.js'
import VoterSim from '../../voters/VoterSim.js'
import VoterGeoList from '../../voters/VoterGeoList.js'
import VizSample from '../../viz/VizSample.js'
import VizSampleDensity1D from '../../viz/VizSampleDensity1D.js'
import VizSampleDensity2D from '../../viz/VizSampleDensity2D.js'

/**
 * Simulate many sample elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {ElectionSample} electionSample
 * @param {ElectionSampleGeo} electionSampleGeo
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
    sim,
) {
    const self = this

    SimBase.call(self, screen, changes, sim)

    // Entities //

    const candidateDnSimList = new CandidateDnSimList(sim, changes)
    const voterSimList = new VoterSimList(sim)
    const voterGeoList = new VoterGeoList(screen, sim, changes)

    self.addSimCandidateDistribution = (canDn) => {
        candidateDnSimList.newCandidate(new CandidateDnSim(canDn, self.dragm, screen, election))
    }

    self.addSimVoterCircle = (voterShape) => {
        voterGeoList.newVoterSim(new VoterSim(voterShape, self.dragm, screen))
        voterSimList.newVoterSim(new VoterSim(voterShape, self.dragm, screen))
    }

    changes.add(['districts'])

    // Strategies //

    let voterList
    let electionStrategy
    let vizSample
    function enterStrategy() {
        voterList = (sim.geo) ? voterGeoList : voterSimList

        electionStrategy = (sim.geo) ? electionSampleGeo : electionSample

        const doDensity = true // TODO : make into an option, perhaps
        const VizSampleDensity = (sim.election.dimensions === 1)
            ? VizSampleDensity1D
            : VizSampleDensity2D
        const VizSampleStrat = (doDensity) ? VizSampleDensity : VizSample
        vizSample = new VizSampleStrat(voterList, candidateDnSimList, screen, changes, sim)
    }

    // Main State Machine Functions //

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        sim.candidateDnAdd.canDnButton.show()
        enterStrategy()
        voterList.updateXY()
        candidateDnSimList.updateXY()
    }

    self.exit = () => {
        sim.candidateDnAdd.canDnButton.hide()
    }

    self.update = () => {
        // Update players. Run an election. Get result. Visualize result.
        // The election handles any changes.
        // The electionResults communicates how to visualize the election.

        voterList.update()
        candidateDnSimList.update()
        const { dimensions } = sim.election
        const addResult = electionStrategy
            .update(voterList, candidateDnSimList, changes, dimensions)
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
        voterList.renderForeground()
        candidateDnSimList.renderForeground()
    }
}
