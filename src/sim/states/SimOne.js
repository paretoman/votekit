/** @module */

import CandidateSim from '../../candidates/CandidateSim.js'
import CandidateSimList from '../../candidates/CandidateSimList.js'
import VoterGeoList from '../../voters/VoterGeoList.js'
import SimBase from './SimBase.js'
import VoterSim from '../../voters/VoterSim.js'
import VizOne from '../../viz/VizOne.js'

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

    const voterGeoList = new VoterGeoList(screen, electionGeo, sim)

    const candidateSimList = new CandidateSimList(sim)

    self.addSimCandidate = (candidate) => {
        candidateSimList.newCandidate(new CandidateSim(candidate, self.dragm))
    }

    self.addSimVoterCircle = (voterShape) => {
        voterGeoList.newVoterSim(new VoterSim(voterShape, self.dragm))
    }

    const vizOne = new VizOne(voterGeoList, candidateSimList, screen, sim)

    changes.add(['districts'])

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        sim.candidateAdd.canButton.show()
        voterGeoList.updateXY()
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

        if (sim.geo) {
            if (changes.check(['districts', 'geo', 'dimensions'])) {
                voterGeoList.updateDistricts()
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
        if (sim.geo) voterGeoList.updateVoters() // can make this only trigger when voters change
        const electionResults = (sim.geo === false)
            ? electionOne.runElectionAndUpdateTallies(voterGeoList, candidateSimList)
            : electionGeo.runElectionAndUpdateTallies(voterGeoList, candidateSimList)
        vizOne.update(electionResults)
        sim.voterTest.update()
        screen.clear()
        screen.clearMaps()
        self.render()
    }

    self.testVote = () => {
        if (sim.geo) {
            electionGeo.testVote(sim.voterTest, candidateSimList)
        } else {
            electionOne.testVote(sim.voterTest, candidateSimList)
        }
    }

    self.render = () => {
        vizOne.render()
    }
    self.renderForeground = () => {
        // electionSample.renderForeground()
        voterGeoList.renderForeground()
        candidateSimList.renderForeground()
        sim.voterTest.renderForeground()
    }
}
