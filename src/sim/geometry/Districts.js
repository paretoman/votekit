/** @module */

import createGeography, { makeTracts, updateCensus, updateDistricts, updateVoters } from '../../election/src/geography/createGeography.js'

/**
 * @constructor
 */
export default function Districts(voterShapeList, changes, electionOptionsMan, simOptions) {
    const self = this

    self.init = () => {
        const electionOptions = electionOptionsMan.getOptions()
        const { dimensions } = simOptions
        const voterGeoms = voterShapeList.getGeoms(dimensions)
        self.geography = createGeography(electionOptions, voterGeoms, dimensions)
    }

    let firstRun = true

    // Update call from sim //
    self.update = () => {
        if (changes.checkNone()) return

        if (firstRun) {
            firstRun = false
            self.init()
            return
        }

        const electionOptions = electionOptionsMan.getOptions()

        if (changes.check(['numTracts'])) {
            const { numTracts } = electionOptions
            self.geography = makeTracts(self.geography, numTracts)
        }

        if (changes.check(['numDistricts'])) {
            const { numDistricts } = electionOptions
            self.geography = updateDistricts(self.geography, numDistricts)
        }

        if (changes.check(['numDistricts', 'numTracts'])) {
            self.geography = updateCensus(self.geography)
        }

        if (changes.check(['draggables', 'dimensions', 'numTracts'])) {
            const { dimensions } = simOptions
            const voterGeoms = voterShapeList.getGeoms(dimensions)
            self.geography = updateVoters(self.geography, voterGeoms, dimensions)
            // todo: maybe make this only trigger when voters change
        }
    }
}
