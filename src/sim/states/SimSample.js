/** @module */

import CandidateDistributionSampler from '../../electionSample/CandidateDistributionSampler.js'
import ElectionSample from '../../electionSample/ElectionSample.js'
import ElectionSampleDistricts from '../../electionSample/ElectionSampleDistricts.js'
import getGeometry from '../getGeometry.js'
import StatePublisher from './StatePublisher.js'

/**
 * Simulate many sample elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {ElectionSample} electionSample
 * @param {ElectionSampleDistricts} electionSampleDistricts
 * @param {VoterDistricts} voterDistricts
 * @constructor
 */
export default function SimSample(
    entities,
    changes,
    voterDistricts,
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
    const electionSampleDistricts = new ElectionSampleDistricts()

    // Main State Machine Functions //
    self.enter = () => {
        electionStrategy = (simOptions.useDistricts) ? electionSampleDistricts : electionSample
        self.pub.enter()
    }
    self.exit = () => { self.pub.exit() }
    self.update = () => {
        // Update players. Run an election. Get result.
        // The election handles any changes.
        // The electionResults communicates how to visualize the election.

        electionOptions.update()

        if (simOptions.useDistricts) voterDistricts.update()
        canDnSampler.update()

        const geometry = getGeometry(voterShapeList, candidateDnList, simOptions, voterDistricts)

        const addResult = electionStrategy.update(geometry, canDnSampler.sampler, changes, electionOptions)
        const simData = { addResult }
        self.pub.update(simData)
    }
}
