/** @module */

import VoterCircle from '../entities/VoterCircle.js'
import Candidate from '../entities/Candidate.js'
import Voters from '../../election/Voters.js'
import Candidates from '../../election/Candidates.js'

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
export default function SimOne(screen, dragm, menu, changes, oneElection) {
    const self = this

    const voters = new Voters()
    const candidates = new Candidates()
    const sq = new Candidate(100, 200, 21, 21, '#e52', screen, dragm, candidates)
    const sq2 = new Candidate(200, 100, 21, 21, '#5e2', screen, dragm, candidates)
    const sq3 = new Candidate(600 - 200, 600 - 100, 21, 21, '#25e', screen, dragm, candidates)
    const ci = new VoterCircle(100, 300, 200, screen, dragm, voters)
    const ci2 = new VoterCircle(500, 300, 200, screen, dragm, voters)

    self.clear = () => {
        candidates.clear()
        voters.clear()
    }

    self.update = () => {
        if (changes.checkNone()) return
        // clear changes, reset to []
        changes.clear()
        oneElection.updateTallies(candidates, voters)
        ci.update(candidates)
        ci2.update(candidates)
    }

    self.render = () => {
        ci.render()
        ci2.render()
        sq.render()
        sq2.render()
        sq3.render()
    }
}
