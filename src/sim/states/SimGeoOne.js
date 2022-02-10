/** @module */

import GeoVoterBasis from '../entities/GeoVoterBasis.js'
import GeoCandidate from '../entities/GeoCandidate.js'

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

    const c1 = new GeoCandidate(100, 200, 21, 21, '#e52', screen, dragm, geoElection)
    const c2 = new GeoCandidate(200, 100, 21, 21, '#5e2', screen, dragm, geoElection)
    const c3 = new GeoCandidate(600 - 200, 600 - 100, 21, 21, '#25e', screen, dragm, geoElection)
    const vb = new GeoVoterBasis(300, 300, 200, screen, dragm, geoElection)

    self.update = () => {
        if (changes.checkNone()) return
        // clear changes, reset to []
        changes.clear()
        geoElection.updateTallies()
        vb.update()
    }

    self.render = () => {
        c1.render()
        c2.render()
        c3.render()
        vb.render()
    }
}
