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

    let voterList
    const voterGeoList = new VoterGeoList(screen, electionGeo, sim, changes)
    const oneVoters = new VoterSimList(sim)
    function updateVoterListStrategy() {
        voterList = (sim.geo) ? voterGeoList : oneVoters
    }

    const candidateSimList = new CandidateSimList(sim)

    let electionStrategy
    function updateElectionStrategy() {
        electionStrategy = (sim.geo) ? electionGeo : electionOne
    }

    let vizOne
    function updateVizStrategy() {
        const VizOneOnly = (sim.election.countVotes.caster === 'castPlurality') ? VizOneVoronoi : VizOneGrid
        const VizOne = (sim.geo === true) ? VizGeo : VizOneOnly
        vizOne = new VizOne(voterGeoList, candidateSimList, screen, sim)
    }

    self.addSimCandidate = (candidate) => {
        candidateSimList.newCandidate(new CandidateSim(candidate, self.dragm))
    }

    self.addSimVoterCircle = (voterShape) => {
        voterGeoList.newVoterSim(new VoterSim(voterShape, self.dragm))
        oneVoters.newVoterSim(new VoterSim(voterShape, self.dragm))
    }

    changes.add(['districts'])

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

        if (sim.geo === true) {
            if (changes.check(['viz', 'geo'])) {
                screen.showMaps()
            }
        } else if (changes.check(['viz', 'electionMethod', 'dimensions'])) {
            // show or hide maps
            if (sim.election.dimensions === 2 && sim.election.countVotes.caster === 'castScore') {
                screen.showMaps()
            } else {
                screen.hideMaps()
            }
        }
        // clear changes, reset to []
        changes.clear()
        voterList.updateVoters() // can make this only trigger when voters change
        // eslint-disable-next-line max-len
        const electionResults = electionStrategy.runElectionAndUpdateTallies(voterList, candidateSimList)
        vizOne.update(voterList, electionResults)
        sim.voterTest.update()
        screen.clear()
        screen.clearMaps()
        self.render()
    }

    self.testVote = () => {
        electionStrategy.testVote(sim.voterTest, candidateSimList)
    }

    self.render = () => {
        vizOne.render()
    }
    self.renderForeground = () => {
        // electionSample.renderForeground()
        voterList.renderForeground()
        candidateSimList.renderForeground()
        sim.voterTest.renderForeground()
    }
}
