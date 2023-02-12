/** @module */

import getSamplingGeometry from '../geometry/getSamplingGeometry.js'
import ElectionSampler from './ElectionSampler.js'

/**
 * Simulate many sample elections with
 *   candidates in random positions within a distribution, and
 *   voters in a distribution that will be summed over.
 * @constructor
 */
export default function SimModeSample(pub, entities, changes, districts, simOptions, electionOptionsMan) {
    const self = this

    const { candidateDnList, voterShapeList } = entities

    const electionSampler = new ElectionSampler()

    self.update = () => {
        // Update players. Run an election. Get result.
        // The election handles any changes.
        // The electionResults communicates how to visualize the election.

        electionOptionsMan.update()
        const electionOptions = electionOptionsMan.getOptions()

        districts.update()

        const samplingGeometry = getSamplingGeometry(voterShapeList, candidateDnList, simOptions, electionOptions, districts)

        const samplingResult = electionSampler.update(samplingGeometry, changes, electionOptions)
        const simData = { samplingResult }

        if (samplingResult.pointsChanged === true || changes.checkAny()) {
            pub.update(simData)
        }
        changes.clear()
    }
}
