/** @module */

import GeoVoterBasis from '../entities/GeoVoterBasis.js'
import GeoCandidate from '../entities/GeoCandidate.js'
import GeoVoters from '../../election/GeoVoters.js'
import Candidates from '../../election/Candidates.js'

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
export default function SimOne(screen, dragm, menu, changes, geoElection) {
    const self = this

    const geoVoters = new GeoVoters(screen, geoElection)
    const candidates = new Candidates()
    const c1 = new GeoCandidate(50, 100, 21, 21, '#e52', screen, dragm, candidates)
    const c2 = new GeoCandidate(100, 50, 21, 21, '#5e2', screen, dragm, candidates)
    const c3 = new GeoCandidate(300 - 100, 300 - 50, 21, 21, '#25e', screen, dragm, candidates)
    const vb = new GeoVoterBasis(150, 150, 100, screen, dragm, geoVoters)
    changes.add(['districts'])

    screen.showGeoMaps()

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
        geoVoters.updateVoters()
        geoElection.updateVotes(geoVoters, candidates)
        screen.clear()
        self.render()
    }

    self.render = () => {
        geoVoters.render()
        vb.render()
    }
    self.renderForeground = () => {
        c1.renderForeground()
        c2.renderForeground()
        c3.renderForeground()
        vb.renderForeground()
    }
}
