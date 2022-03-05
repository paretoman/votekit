/** @module */

import GeoVoterBasis from '../entities/GeoVoterBasis.js'
import GeoVoters from '../../election/GeoVoters.js'
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
export default function SimGeoOne(
    screen,
    dragm,
    menu,
    changes,
    geoElection,
    commander,
    candidates,
) {
    const self = this

    const geoVoters = new GeoVoters(screen, geoElection)

    self.addSimVoterCircle = (voterCircle) => {
        geoVoters.newVoterGroup(new GeoVoterBasis(voterCircle, screen))
    }

    changes.add(['districts'])

    self.enter = () => {
        screen.showGeoMaps()
    }

    self.exit = () => {
        screen.hideGeoMaps()
    }

    self.clear = () => {
        candidates.clear()
        geoVoters.clear()
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
        geoElection.updateVotes(geoVoters, candidates)
        screen.clear()
        self.render()
    }

    self.render = () => {
        geoVoters.render()
    }
    self.renderForeground = () => {
        candidates.renderForeground()
        geoVoters.renderForeground()
    }
}
