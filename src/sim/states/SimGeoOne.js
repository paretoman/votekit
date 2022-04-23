/** @module */

import GeoVoterBasis from '../../voters/GeoVoterBasis.js'
import SimCandidate from '../../candidates/SimCandidate.js'
import SimCandidateList from '../../candidates/SimCandidateList.js'
import GeoVoters from '../../voters/GeoVoters.js'
import SimBase from './SimBase.js'
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

    const geoVoters = new GeoVoters(screen, geoElection, sim)

    const simCandidateList = new SimCandidateList(sim)

    self.addSimCandidate = (candidate) => {
        simCandidateList.newCandidate(new SimCandidate(candidate, self.dragm))
    }

    self.addSimVoterCircle = (voterShape) => {
        geoVoters.newVoterGroup(new GeoVoterBasis(voterShape, self.dragm, screen))
    }

    changes.add(['districts'])

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        screen.showGeoMaps()
        sim.simAddCandidates.canButton.show()
        sim.election.setDimensions(2)
        geoVoters.updateXY()
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
            geoVoters.updateDistricts()
        }
        changes.clear()
        geoVoters.updateVoters() // can make this only trigger when voters change
        geoElection.updateVotes(geoVoters, simCandidateList, sim.dimensions)
        sim.testVoter.update()
        screen.clear()
        self.render()
    }

    self.testVote = () => geoElection.testVote(sim.testVoter, simCandidateList)

    self.render = () => {
        geoVoters.render()
    }
    self.renderForeground = () => {
        simCandidateList.renderForeground()
        geoVoters.renderForeground()
        sim.testVoter.renderForeground()
    }
}
