/** @module */

import CandidateDistributionSampler from '../sampler/CandidateDistributionSampler.js'
import getGeometry from '../geometry/getGeometry.js'
import Sampler from '../sampler/Sampler.js'

/**
 * Simulate many sample elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @constructor
 */
export default function SimModeSample(pub, entities, changes, districts, simOptions, electionOptionsMan) {
    const self = this

    const { candidateDnList, voterShapeList } = entities
    const canDnSampler = new CandidateDistributionSampler(candidateDnList, changes, simOptions)

    const sampler = new Sampler()

    self.update = () => {
        // Update players. Run an election. Get result.
        // The election handles any changes.
        // The electionResults communicates how to visualize the election.

        electionOptionsMan.update()
        const electionOptions = electionOptionsMan.getOptions()

        districts.update()
        canDnSampler.update()

        const geometry = getGeometry(voterShapeList, candidateDnList, simOptions, electionOptions, districts)

        const samplingResult = sampler.update(geometry, canDnSampler.sampler, changes, electionOptions)
        const simData = { samplingResult }

        if (samplingResult.pointsChanged === true || changes.checkAny()) {
            pub.update(simData)
        }
        changes.clear()
    }
}
