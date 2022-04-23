/** @module */

import VoterGeoBasis from '../../voters/VoterGeoBasis.js'
import SimCandidate from '../../candidates/SimCandidate.js'
import SimCandidateList from '../../candidates/SimCandidateList.js'
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
export default function SimGeoOne(screen, menu, changes, geoElection, sim) {
    const self = this

    SimBase.call(self, screen, changes, sim)

    const voterGeoList = new VoterGeoList(screen, geoElection, sim)

    const simCandidateList = new SimCandidateList(sim)

    self.addSimCandidate = (candidate) => {
        simCandidateList.newCandidate(new SimCandidate(candidate, self.dragm))
    }

    self.addSimVoterCircle = (voterShape) => {
        voterGeoList.newVoterGroup(new VoterGeoBasis(voterShape, self.dragm, screen))
    }

    const vizGeo2D = new VizGeo2D(voterGeoList, screen)

    changes.add(['districts'])

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        screen.showGeoMaps()
        sim.simAddCandidates.canButton.show()
        sim.election.setDimensions(2)
        voterGeoList.updateXY()
        simCandidateList.updateXY()
        sim.testVoter.updateXY()
    }

    self.exit = () => {
        screen.hideGeoMaps()
        sim.simAddCandidates.canButton.hide()
        // clean up fractions
        const fillUndefined = Array(simCandidateList.numCandidates()).fill(undefined)
        simCandidateList.setCandidateWins(fillUndefined)
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
        const geoElectionResults = geoElection.updateVotes(voterGeoList, simCandidateList)
        vizGeo2D.update(geoElectionResults)
        sim.testVoter.update()
        screen.clear()
        self.render()
    }

    self.testVote = () => geoElection.testVote(sim.testVoter, simCandidateList)

    self.render = () => {
        vizGeo2D.render()
    }
    self.renderForeground = () => {
        simCandidateList.renderForeground()
        voterGeoList.renderForeground()
        sim.testVoter.renderForeground()
    }
}
