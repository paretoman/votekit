/** @module */

import VoterCircle from './VoterCircle.js'
import Candidate from './Candidate.js'

/**
 * Simulate one election with
 *   candidates in defined positions, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {DraggableManager} dragm
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Election} election
 */
export default function SimOne(screen, dragm, menu, changes, election) {
    const self = this

    const sq = new Candidate(100, 200, 21, 21, '#e52', screen, dragm, election)
    const sq2 = new Candidate(200, 100, 21, 21, '#5e2', screen, dragm, election)
    const sq3 = new Candidate(600 - 200, 600 - 100, 21, 21, '#25e', screen, dragm, election)
    const ci = new VoterCircle(100, 300, 200, screen, dragm, election)
    const ci2 = new VoterCircle(500, 300, 200, screen, dragm, election)

    self.update = () => {
        if (changes.checkNone()) return
        // clear changes, reset to []
        changes.clear()
        election.updateTallies()
        ci.update()
        ci2.update()
    }

    self.render = () => {
        ci.render()
        ci2.render()
        sq.render()
        sq2.render()
        sq3.render()
    }
}
