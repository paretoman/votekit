/** @module */

import SimVoterCircle from './SimVoterCircle.js'
import SimElections from './SimElections.js'
import CandidateDistribution from './CandidateDistribution.js'

/**
 * Simulate many elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {DraggableManager} dragm
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {Election} election
 */
export default function SimMany(screen, dragm, menu, changes, election) {
    const self = this

    const simElections = new SimElections(screen, menu, election)

    const cd = new CandidateDistribution(300, 300, 400, screen, dragm, simElections)
    const ci = new SimVoterCircle(100, 300, 200, screen, dragm, simElections)
    const ci2 = new SimVoterCircle(500, 300, 200, screen, dragm, simElections)

    self.update = () => {
        if (changes.checkNone()) {
            simElections.addSim()
            return
        }
        // clear changes, reset to []
        changes.clear()
        simElections.startSim()
        ci.update()
        ci2.update()
    }

    self.render = () => {
        simElections.render()
        ci.render()
        ci2.render()
        cd.render()
    }
}
