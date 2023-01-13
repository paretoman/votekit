/** @module */

import CandidateDistributionSampler from '../../electionSample/CandidateDistributionSampler.js'
import ElectionSample from '../../electionSample/ElectionSample.js'
import ElectionSampleDistricts from '../../electionSample/ElectionSampleDistricts.js'
import getGeometry from '../getGeometry.js'

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
    pub,
    entities,
    changes,
    voterDistricts,
    simOptions,
    electionOptions,
) {
    const self = this

    const { candidateDnList, voterShapeList } = entities
    const canDnSampler = new CandidateDistributionSampler(candidateDnList, changes, simOptions)

    const electionSample = new ElectionSample()
    const electionSampleDistricts = new ElectionSampleDistricts()

    self.update = () => {
        // Update players. Run an election. Get result.
        // The election handles any changes.
        // The electionResults communicates how to visualize the election.

        electionOptions.update()

        if (simOptions.useDistricts) voterDistricts.update()
        canDnSampler.update()

        const geometry = getGeometry(voterShapeList, candidateDnList, simOptions, voterDistricts)

        const electionStrategy = (simOptions.useDistricts) ? electionSampleDistricts : electionSample
        const samplingResult = electionStrategy.update(geometry, canDnSampler.sampler, changes, electionOptions)
        const simData = { samplingResult }
        pub.update(simData)
        changes.clear()
    }
}
