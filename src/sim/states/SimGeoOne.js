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
    const c1 = new GeoCandidate(100, 200, 21, 21, '#e52', screen, dragm, candidates)
    const c2 = new GeoCandidate(200, 100, 21, 21, '#5e2', screen, dragm, candidates)
    const c3 = new GeoCandidate(600 - 200, 600 - 100, 21, 21, '#25e', screen, dragm, candidates)
    const vb = new GeoVoterBasis(300, 300, 200, screen, dragm, geoVoters)
    changes.add(['districts'])

    self.clear = () => {
        candidates.clear()
        geoVoters.clear()
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
    }

    self.render = () => {
        geoVoters.render()
        c1.render()
        c2.render()
        c3.render()
        vb.render()
    }
}
