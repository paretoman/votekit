/** @module */

import CandidateSim from '../../candidates/CandidateSim.js'
import CandidateSimList from '../../candidates/CandidateSimList.js'
import VoterGeoList from '../../voters/VoterGeoList.js'
import SimBase from './SimBase.js'
import VoterSim from '../../voters/VoterSim.js'
import VizGeo from '../../viz/VizGeo.js'
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
        voterGeoList.newVoterSim(new VoterSim(voterShape, self.dragm))
    }

    const vizGeo2D = new VizGeo(voterGeoList, null, screen, sim)

    changes.add(['districts'])

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        screen.showMaps()
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
        // deal with changes
        if (changes.check(['districts', 'geo', 'dimensions'])) {
            voterGeoList.updateDistricts()
        }
        // clear changes, reset to []
        changes.clear()
        voterGeoList.updateVoters() // can make this only trigger when voters change
        // eslint-disable-next-line max-len
        const geoElectionResults = electionGeo.runElectionAndUpdateTallies(voterGeoList, candidateSimList)
        vizGeo2D.update(geoElectionResults)
        sim.voterTest.update()
        screen.clear()
        self.render()
    }

    self.testVote = () => electionGeo.testVote(sim.voterTest, candidateSimList)

    self.render = () => {
        vizGeo2D.render()
    }
    self.renderForeground = () => {
        candidateSimList.renderForeground()
        voterGeoList.renderForeground()
        sim.voterTest.renderForeground()
    }
}
