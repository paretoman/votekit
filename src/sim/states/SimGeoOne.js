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
 * @param {DraggableManager} dragm
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Election} election
 * @param {Object} canButton - a button that lets us add a candidate
 * @constructor
 */
export default function SimGeoOne(screen, dragm, menu, changes, geoElection, canButton) {
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

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        screen.showGeoMaps()
        canButton.show()
    }

    self.exit = () => {
        screen.hideGeoMaps()
        canButton.hide()
    }

    self.update = () => {
        if (changes.checkNone()) return
        // clear changes, reset to []
        if (changes.check(['districts', 'simType'])) {
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
