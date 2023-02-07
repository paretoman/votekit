/** @module */

import CandidateDistributionSampler from '../../election/sampler/CandidateDistributionSampler.js'
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
 * @param {DistrictGeometry} districtGeometry
 * @constructor
 */
export default function SimModeSample(pub, entities, changes, districtGeometry, simOptions, electionOptions) {
    const self = this

    const { candidateDnList, voterShapeList } = entities
    const canDnSampler = new CandidateDistributionSampler(candidateDnList, changes, simOptions)

    const electionSampler = new ElectionSampler()

    self.update = () => {
        // Update players. Run an election. Get result.
        // The election handles any changes.
        // The electionResults communicates how to visualize the election.

        electionOptions.update()

        if (electionOptions.useDistricts) districtGeometry.update()
        canDnSampler.update()

        const geometry = getGeometry(voterShapeList, candidateDnList, simOptions, electionOptions, districtGeometry)

        const samplingResult = electionSampler.update(geometry, canDnSampler.sampler, changes, electionOptions)
        const simData = { samplingResult }

        if (samplingResult.pointsChanged === true || changes.checkAny()) {
            pub.update(simData)
        }
        changes.clear()
    }
}
