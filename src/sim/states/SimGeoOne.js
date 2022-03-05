/** @module */

import GeoVoterBasis from '../entities/GeoVoterBasis.js'
import SimCandidate from '../entities/SimCandidate.js'
import SimCandidateList from '../entities/SimCandidateList.js'
import GeoVoters from '../../election/GeoVoters.js'
import SimBase from './SimBase.js'
/**
 * Simulate one election with
 *   candidates in defined positions, and
 *   voters in a distribution that will be summed over.
 * Create a geographical map with variations of voter center.
 * @param {Screen} screen
 * @param {DraggableManager} dragm
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Election} election
 */
export default function SimGeoOne(screen, dragm, menu, changes, geoElection) {
    const self = this

    SimBase.call(self, dragm, screen)

    const geoVoters = new GeoVoters(screen, geoElection)

    const simCandidateList = new SimCandidateList()

    self.addSimCandidate = (candidate) => {
        simCandidateList.newCandidate(new SimCandidate(candidate, dragm))
    }

    self.addSimVoterCircle = (voterCircle) => {
        geoVoters.newVoterGroup(new GeoVoterBasis(voterCircle, dragm, screen))
    }

    changes.add(['districts'])

    self.enter = () => {
        screen.showGeoMaps()
        screen.eventHandlers.set(dragm.eventHandlers)
    }

    self.exit = () => {
        screen.hideGeoMaps()
    }

    self.update = () => {
        if (changes.checkNone()) return
        // clear changes, reset to []
        if (changes.check(['districts'])) {
            geoVoters.updateDistricts()
        }
        changes.clear()
        geoVoters.updateVoters() // can make this only trigger when voters change
        geoElection.updateVotes(geoVoters, simCandidateList)
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
