/** @module */

import CandidateDnSimList from '../../candidateDns/CandidateDnSimList.js'
import CandidateDnSim from '../../candidateDns/CandidateDnSim.js'
import VoterSimList from '../../voters/VoterSimList.js'
import SimBase from './SimBase.js'
import VoterSim from '../../voters/VoterSim.js'
import VoterGeoList from '../../voters/VoterGeoList.js'
import VizSampleGeo from '../../viz/VizSampleGeo.js'
import VizSampleBase from '../../viz/VizSampleBase.js'

/**
 * Simulate many sample elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {ElectionSample} electionSample
 * @param {ElectionSampleGeo} electionSampleGeo
 * @param {Sim} sim
 * @constructor
 */
export default function SimSample(screen, menu, changes, electionSample, electionSampleGeo, sim) {
    const self = this

    SimBase.call(self, screen, changes, sim)

    // Entities //

    const candidateSimList = new CandidateDnSimList(sim, changes)
    const voterSimList = new VoterSimList(sim)
    const voterGeoList = new VoterGeoList(screen, sim, changes)

    self.addSimCandidateDistribution = (canDn) => {
        candidateSimList.newCandidate(new CandidateDnSim(canDn, self.dragm))
    }

    self.addSimVoterCircle = (voterShape) => {
        voterGeoList.newVoterSim(new VoterSim(voterShape, self.dragm))
        voterSimList.newVoterSim(new VoterSim(voterShape, self.dragm))
    }

    changes.add(['districts'])

    // Strategies //

    let voterList
    let electionStrategy
    let vizSample
    function enterStrategy() {
        voterList = (sim.geo) ? voterGeoList : voterSimList

        electionStrategy = (sim.geo) ? electionSampleGeo : electionSample

        const VizSample = (sim.geo === true) ? VizSampleGeo : VizSampleBase
        vizSample = new VizSample(voterList, candidateSimList, screen, changes, sim)
    }

    // Main State Machine Functions //

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        sim.candidateDnAdd.canDnButton.show()
        enterStrategy()
        voterList.updateXY()
        candidateSimList.updateXY()
    }

    self.exit = () => {
        sim.candidateDnAdd.canDnButton.hide()
    }

    self.update = () => {
        // Update players. Run an election. Get result. Visualize result.
        // The election handles any changes.
        // The electionResults communicates how to visualize the election.

        voterList.update()
        candidateSimList.update()
        const { dimensions } = sim.election
        const addResult = electionStrategy.update(voterList, candidateSimList, changes, dimensions)
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
        candidateSimList.render()
    }
    self.renderForeground = () => {
        voterList.renderForeground()
        candidateSimList.renderForeground()
    }
}
