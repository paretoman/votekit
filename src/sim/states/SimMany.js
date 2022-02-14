/** @module */

import SimVoterCircle from '../entities/SimVoterCircle.js'
import CandidateDistribution from '../entities/CandidateDistribution.js'
import Voters from '../../election/Voters.js'
import SampleCandidates from '../../election/SampleCandidates.js'

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

    const voters = new Voters()
    const sampleCandidates = new SampleCandidates()
    const cd = new CandidateDistribution(300, 300, 400, screen, dragm, sampleCandidates)
    const ci = new SimVoterCircle(100, 300, 200, screen, dragm, voters)
    const ci2 = new SimVoterCircle(500, 300, 200, screen, dragm, voters)

    self.clear = () => {
        sampleCandidates.clear()
        voters.clear()
    }

    self.update = () => {
        if (changes.checkNone()) {
            simElections.addSim(voters, sampleCandidates)
        } else {
            // clear changes, reset to []
            changes.clear()
            sampleCandidates.startSampler()
            simElections.startSim()
        }
    }

    self.render = () => {
        simElections.render()
        ci.render()
        ci2.render()
        cd.render()
    }
}
