/** @module */

import VoterGeoBasis from '../../voters/VoterGeoBasis.js'
import CandidateSim from '../../candidates/CandidateSim.js'
import CandidateSimList from '../../candidates/CandidateSimList.js'
import VoterGeoList from '../../voters/VoterGeoList.js'
import SimBase from './SimBase.js'
import VizGeo2D from '../../viz/VizGeo2D.js'
/**
 * Simulate one election with
 *   candidates in defined positions, and
 *   voters in a distribution that will be summed over.
 * Create a geographical map with variations of voter center.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Election} election
 * @param {Sim} sim
 * @constructor
 */
export default function SimGeoOne(screen, menu, changes, electionGeo, sim) {
    const self = this

    SimBase.call(self, screen, changes, sim)

    const voterGeoList = new VoterGeoList(screen, electionGeo, sim)

    const candidateSimList = new CandidateSimList(sim)

    self.addSimCandidate = (candidate) => {
        candidateSimList.newCandidate(new CandidateSim(candidate, self.dragm))
    }

    self.addSimVoterCircle = (voterShape) => {
        voterGeoList.newVoterSim(new VoterGeoBasis(voterShape, self.dragm, screen))
    }

    const vizGeo2D = new VizGeo2D(voterGeoList, screen)

    changes.add(['districts'])

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        screen.showGeoMaps()
        sim.candidateAdd.canButton.show()
        sim.election.setDimensions(2)
        voterGeoList.updateXY()
        candidateSimList.updateXY()
        sim.testVoter.updateXY()
    }

    self.exit = () => {
        screen.hideGeoMaps()
        sim.candidateAdd.canButton.hide()
        // clean up fractions
        const fillUndefined = Array(candidateSimList.numCandidates()).fill(undefined)
        candidateSimList.setCandidateWins(fillUndefined)
        sim.testVoter.setE(0)
    }

    self.update = () => {
        if (changes.checkNone()) return
        // clear changes, reset to []
        if (changes.check(['districts', 'simType'])) {
            voterGeoList.updateDistricts()
        }
        changes.clear()
        voterGeoList.updateVoters() // can make this only trigger when voters change
        const geoElectionResults = electionGeo.updateVotes(voterGeoList, candidateSimList)
        vizGeo2D.update(geoElectionResults)
        sim.testVoter.update()
        screen.clear()
        self.render()
    }

    self.testVote = () => electionGeo.testVote(sim.testVoter, candidateSimList)

    self.render = () => {
        vizGeo2D.render()
    }
    self.renderForeground = () => {
        candidateSimList.renderForeground()
        voterGeoList.renderForeground()
        sim.testVoter.renderForeground()
    }
}
