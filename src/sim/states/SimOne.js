/** @module */

import CandidateSim from '../../candidates/CandidateSim.js'
import CandidateSimList from '../../candidates/CandidateSimList.js'
import VoterGeoList from '../../voters/VoterGeoList.js'
import SimBase from './SimBase.js'
import VoterSim from '../../voters/VoterSim.js'
import VoterSimList from '../../voters/VoterSimList.js'
import VizGeo from '../../viz/VizGeo.js'
import VizOneVoronoi from '../../viz/VizOneVoronoi.js'
import VizOneGrid from '../../viz/VizOneGrid.js'

/**
 * Simulate one election with
 *   candidates in defined positions, and
 *   voters in a distribution that will be summed over.
 * Create a geographical map with variations of voter center.
 * Plan:
 * * SimOne is a subclass of SimBase.
 * * VizOne is a subclass of VoterSim.
 * * Voronoi1D is called by VizOne.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {ElectionOne} electionOne
 * @param {ElectionGeo} electionGeo
 * @param {Sim} sim
 * @constructor
 */
export default function SimOne(screen, menu, changes, electionOne, electionGeo, sim) {
    const self = this

    SimBase.call(self, screen, changes, sim)

    // Entities //

    const candidateSimList = new CandidateSimList(sim)
    const voterSimList = new VoterSimList(sim)
    const voterGeoList = new VoterGeoList(screen, sim, changes)

    self.addSimCandidate = (candidate) => {
        candidateSimList.newCandidate(new CandidateSim(candidate, self.dragm))
    }

    self.addSimVoterCircle = (voterShape) => {
        voterGeoList.newVoterSim(new VoterSim(voterShape, self.dragm))
        voterSimList.newVoterSim(new VoterSim(voterShape, self.dragm))
    }

    changes.add(['districts'])

    // Strategies //

    let voterList
    function updateVoterListStrategy() {
        voterList = (sim.geo) ? voterGeoList : voterSimList
    }

    let electionStrategy
    function updateElectionStrategy() {
        electionStrategy = (sim.geo) ? electionGeo : electionOne
    }

    let vizOne
    function updateVizStrategy() {
        const VizNoGeo = (sim.election.countVotes.casterName === 'castPlurality') ? VizOneVoronoi : VizOneGrid
        const VizOne = (sim.geo === true) ? VizGeo : VizNoGeo
        vizOne = new VizOne(voterList, candidateSimList, screen, sim, changes)
    }

    // Main State Machine Functions //

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        sim.candidateAdd.canButton.show()
        updateVoterListStrategy()
        updateElectionStrategy()
        updateVizStrategy()
        voterList.updateXY()
        candidateSimList.updateXY()
        sim.voterTest.updateXY()
    }

    self.exit = () => {
        screen.hideMaps()
        sim.candidateAdd.canButton.hide()
        // clean up fractions
        const fillUndefined = Array(candidateSimList.numCandidates()).fill(undefined)
        candidateSimList.setCandidateWins(fillUndefined)
        sim.voterTest.setE(0)
    }

    self.update = () => {
        if (changes.checkNone()) return

        voterList.update()
        const electionResults = electionStrategy
            .runElectionSim(voterList, candidateSimList, changes)
        vizOne.update(voterList, electionResults)
        self.testVoteSim()
        changes.clear()

        screen.clear()
        screen.clearMaps()
        self.render()
    }

    self.testVoteSim = () => {
        const vote = electionStrategy.testVoteES(sim.voterTest, candidateSimList)
        sim.voterTest.update(vote, candidateSimList)
        return vote
    }

    self.render = () => {
        vizOne.render()
    }
    self.renderForeground = () => {
        voterList.renderForeground()
        candidateSimList.renderForeground()
        sim.voterTest.renderForeground()
    }
}
