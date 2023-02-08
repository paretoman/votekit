/** @module */

import CandidateDistributionSampler from '../sampler/CandidateDistributionSampler.js'
import ElectionSampler from '../../election/sampler/ElectionSampler.js'
import getGeometry from '../sim/getGeometry.js'

/**
 * Simulate many sample elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {ElectionSample} electionSample
 * @param {ElectionSampler} electionSampler
 * @param {DistrictGeometry} districts
 * @constructor
 */
export default function SimModeSample(pub, entities, changes, districts, simOptions, electionOptions) {
    const self = this

    const { candidateDnList, voterShapeList } = entities
    const canDnSampler = new CandidateDistributionSampler(candidateDnList, changes, simOptions)

    const electionSampler = new ElectionSampler()

    self.update = () => {
        // Update players. Run an election. Get result.
        // The election handles any changes.
        // The electionResults communicates how to visualize the election.

        electionOptions.update()
        districts.update()
        canDnSampler.update()

        const geometry = getGeometry(voterShapeList, candidateDnList, simOptions, electionOptions, districts)

        const samplingResult = electionSampler.update(geometry, canDnSampler.sampler, changes, electionOptions)
        const simData = { samplingResult }

        if (samplingResult.pointsChanged === true || changes.checkAny()) {
            pub.update(simData)
        }
        changes.clear()
    }
}
