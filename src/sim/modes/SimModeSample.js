/** @module */

import getSamplingGeometry from '../geometry/getSamplingGeometry.js'
import ElectionSampler from './ElectionSampler.js'
import updateSeeds from './updateSeeds.js'

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
        // The samplingResult communicates how to visualize the election.

        electionOptionsMan.update()
        const optionsBag = electionOptionsMan.getOptions()

        districts.update()
        updateSeeds(simOptions, changes)

        const samplingGeometry = getSamplingGeometry(voterShapeList, candidateDnList, simOptions, optionsBag, districts)

        if (optionsBag.useGeography === true && optionsBag.sequenceOptions.sequenceName !== 'general') {
            const message = 'Elections with both geographic components and sequence components are not yet implemented. Change number of districts to 1 and number of tracts to 1 or change election sequence to general.'
            // eslint-disable-next-line no-console
            console.warn(message)
            // eslint-disable-next-line no-alert
            window.alert(message)
        }

        const samplingResult = electionSampler.update(samplingGeometry, changes, optionsBag)
        const simData = { samplingResult }

        if (samplingResult.pointsChanged === true || changes.checkAny()) {
            pub.update(simData)
        }
        changes.clear()
    }
}
