/** @module */

import CandidateDistributionSampler from '../../electionSample/CandidateDistributionSampler.js'
import ElectionSample from '../../electionSample/ElectionSample.js'
import ElectionSampleGeo from '../../electionSample/ElectionSampleGeo.js'
import getGeometry from '../getGeometry.js'
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
 * @constructor
 */
export default function SimSample(
    entities,
    changes,
    voterGeo,
    simOptions,
    electionOptions,
) {
    const self = this

    self.pub = new StatePublisher()

    const { candidateDnList, voterShapeList } = entities
    const canDnSampler = new CandidateDistributionSampler(candidateDnList, changes, simOptions)

    // Strategies //
    let electionStrategy

    const electionSample = new ElectionSample()
    const electionSampleGeo = new ElectionSampleGeo()

    // Main State Machine Functions //
    self.enter = () => {
        electionStrategy = (simOptions.geo) ? electionSampleGeo : electionSample
        self.pub.enter()
    }
    self.exit = () => { self.pub.exit() }
    self.update = () => {
        // Update players. Run an election. Get result.
        // The election handles any changes.
        // The electionResults communicates how to visualize the election.

        electionOptions.update()

        if (simOptions.geo) voterGeo.update()
        canDnSampler.update()

        const geometry = getGeometry(voterShapeList, candidateDnList, simOptions, voterGeo)

        const addResult = electionStrategy
            .update(geometry, canDnSampler.sampler, changes, electionOptions)
        self.pub.update(addResult)
    }
}
