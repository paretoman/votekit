/** @module */

import CandidateDnSimList from '../../candidateDns/CandidateDnSimList.js'
import CandidateDnSim from '../../candidateDns/CandidateDnSim.js'
import VizSample2D from '../../viz/VizSample2D.js'
import VoterSimList from '../../voters/VoterSimList.js'
import SimBase from './SimBase.js'
import VoterSim from '../../voters/VoterSim.js'

/**
 * Simulate many sample elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {ElectionSample} electionSample
 * @param {Sim} sim
 * @constructor
 */
export default function SimSample(screen, menu, changes, electionSample, sim) {
    const self = this

    SimBase.call(self, screen, changes, sim)

    const candidateSimList = new CandidateDnSimList(sim, changes)

    self.addSimCandidateDistribution = (canDn) => {
        candidateSimList.newCandidate(new CandidateDnSim(canDn, self.dragm))
    }

    const sampleVoters = new VoterSimList(sim)

    self.addSimVoterCircle = (voterShape) => {
        sampleVoters.newVoterSim(new VoterSim(voterShape, self.dragm))
    }

    const vizSample2D = new VizSample2D(sampleVoters, screen, changes)

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        sim.candidateDnAdd.canDnButton.show()
        sampleVoters.updateXY()
        candidateSimList.updateXY()
    }

    self.exit = () => {
        sim.candidateDnAdd.canDnButton.hide()
    }

    self.update = () => {
        // Update players. Run an election. Get result. Visualize result.
        // The election handles any changes.
        // The electionResult communicates how to visualize the election.

        candidateSimList.update()
        const addResult = electionSample.update(sampleVoters, candidateSimList, changes)
        vizSample2D.update(addResult)
        changes.clear()

        const { noChange } = addResult
        if (!noChange) {
            screen.clear()
            self.render()
        }
    }

    self.render = () => {
        vizSample2D.render()
        candidateSimList.render()
    }
    self.renderForeground = () => {
        sampleVoters.renderForeground()
        candidateSimList.renderForeground()
    }
}
