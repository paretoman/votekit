/** @module */

import CandidateDistributionSampler from '../electionSample/CandidateDistributionSampler.js'
import ElectionSampler from '../electionSample/ElectionSampler.js'
import getGeometry from './getGeometry.js'

/**
 * Simulate many sample elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {ElectionSample} electionSample
 * @param {ElectionSampler} electionSampler
 * @param {VoterDistricts} voterDistricts
 * @constructor
 */
export default function SimModeSample(pub, entities, changes, voterDistricts, simOptions, electionOptions) {
    const self = this

    const { candidateDnList, voterShapeList } = entities
    const canDnSampler = new CandidateDistributionSampler(candidateDnList, changes, simOptions)

    const electionSampler = new ElectionSampler()

    self.update = () => {
        // Update players. Run an election. Get result.
        // The election handles any changes.
        // The electionResults communicates how to visualize the election.

        electionOptions.update()

        if (simOptions.useDistricts) voterDistricts.update()
        canDnSampler.update()

        const geometry = getGeometry(voterShapeList, candidateDnList, simOptions, voterDistricts)

        const samplingResult = electionSampler.update(geometry, canDnSampler.sampler, changes, simOptions, electionOptions)
        const simData = { samplingResult }
        pub.update(simData)
        changes.clear()
    }
}
