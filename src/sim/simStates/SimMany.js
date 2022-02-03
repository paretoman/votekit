/** @module */

import SimVoterCircle from '../../simObjects/SimVoterCircle.js'
import CandidateDistribution from '../../simObjects/CandidateDistribution.js'

/**
 * Simulate many elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {DraggableManager} dragm
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {SimElection} simElections
 */
export default function SimMany(screen, dragm, menu, changes, simElections) {
    const self = this

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
