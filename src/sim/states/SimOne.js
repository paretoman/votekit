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
    const sq = new Candidate(50, 100, 21, 21, '#e52', screen, dragm, candidates)
    const sq2 = new Candidate(100, 50, 21, 21, '#5e2', screen, dragm, candidates)
    const sq3 = new Candidate(300 - 100, 300 - 50, 21, 21, '#25e', screen, dragm, candidates)
    const ci = new VoterCircle(50, 150, 100, screen, dragm, voters)
    const ci2 = new VoterCircle(250, 150, 100, screen, dragm, voters)

    self.clear = () => {
        candidates.clear()
        voters.clear()
    }

    self.update = () => {
        if (changes.checkNone()) return
        // clear changes, reset to []
        changes.clear()
        oneElection.updateTallies(voters, candidates)
        ci.update(candidates)
        ci2.update(candidates)
        screen.clear()
        self.render()
    }

    self.render = () => {
        ci.render()
        ci2.render()
    }
    self.renderForeground = () => {
        // sampleElections.renderForeground()
        ci.renderForeground()
        ci2.renderForeground()
        sq.renderForeground()
        sq2.renderForeground()
        sq3.renderForeground()
    }
}
