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

    SimBase.call(self, screen, changes)

    const geoVoters = new GeoVoters(screen, geoElection)

    const simCandidateList = new SimCandidateList()

    self.addSimCandidate = (candidate) => {
        simCandidateList.newCandidate(new SimCandidate(candidate, self.dragm))
    }

    self.addSimVoterCircle = (voterCircle) => {
        geoVoters.newVoterGroup(new GeoVoterBasis(voterCircle, self.dragm, screen))
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
    }

    self.exit = () => {
        screen.hideGeoMaps()
        sim.simAddCandidates.canButton.hide()
        // clean up fractions
        const fillUndefined = Array(simCandidateList.numCandidates()).fill(undefined)
        simCandidateList.setCandidateWins(fillUndefined)
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
        screen.clear()
        self.render()
    }

    self.render = () => {
        geoVoters.render()
    }
    self.renderForeground = () => {
        simCandidateList.renderForeground()
        geoVoters.renderForeground()
    }
}
