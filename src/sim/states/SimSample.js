/** @module */

import CandidateDistributionSampler from '../../election/CandidateDistributionSampler.js'
import StatePublisher from './StatePublisher.js'

/**
 * Simulate many sample elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {ElectionSample} electionSample
 * @param {ElectionSampleGeo} electionSampleGeo
 * @param {VoterGeo} voterGeo
 * @param {Sim} sim
 * @constructor
 */
export default function SimSample(
    entities,
    menu,
    changes,
    election,
    electionSample,
    electionSampleGeo,
    voterGeo,
    sim,
) {
    const self = this

    self.pub = new StatePublisher()

    const { candidateDnList, voterShapeList } = entities
    const canDnSampler = new CandidateDistributionSampler(candidateDnList, changes, election)

    // Strategies //
    let electionStrategy

    // Main State Machine Functions //
    self.enter = () => {
        electionStrategy = (sim.geo) ? electionSampleGeo : electionSample
        self.pub.enter()
    }
    self.exit = () => { self.pub.exit() }
    self.update = () => {
        // Update players. Run an election. Get result.
        // The election handles any changes.
        // The electionResults communicates how to visualize the election.

        if (sim.geo) voterGeo.update()
        canDnSampler.update()

        const { dimensions } = sim.election
        const addResult = electionStrategy
            .update(voterShapeList, candidateDnList, canDnSampler.sampler, changes, dimensions)
        self.pub.update(addResult)
        return addResult
    }
    self.render = () => { self.pub.render() }
    self.renderForeground = () => { self.pub.renderForeground() }
    self.clear = () => { self.pub.clear() }
    self.clearForeground = () => { self.pub.clearForeground() }
}
