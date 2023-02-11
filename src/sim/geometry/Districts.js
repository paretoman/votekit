/** @module */

import createDistrictGeometry, { makeTracts, updateCensus, updateDistricts, updateVoters } from '../../election/districtGeometry/createDistrictGeometry.js'

/**
 * @constructor
 */
export default function Districts(voterShapeList, changes, electionOptions, simOptions) {
    const self = this

    self.districtGeometry = createDistrictGeometry()

    // We need to updateVoters the first time we change numDistricts to greater than 1,
    // but not the next time.
    let firstRun = true

    // Update call from sim //
    self.update = () => {
        if (electionOptions.useGeography === false) return
        if (changes.checkNone()) return

        if (changes.check(['numTracts'])) {
            const { numTracts } = electionOptions
            self.districtGeometry = makeTracts(self.districtGeometry, numTracts)
        }

        if (changes.check(['numDistricts'])) {
            const { numDistricts } = electionOptions
            self.districtGeometry = updateDistricts(self.districtGeometry, numDistricts)
        }

        if (changes.check(['numDistricts', 'numTracts'])) {
            self.districtGeometry = updateCensus(self.districtGeometry)
        }

        if (firstRun || changes.check(['draggables', 'dimensions', 'numTracts'])) {
            firstRun = false
            const { dimensions } = simOptions
            const voterGeoms = voterShapeList.getGeoms(dimensions)
            self.districtGeometry = updateVoters(self.districtGeometry, voterGeoms, dimensions)
            // todo: maybe make this only trigger when voters change
        }
    }
}
