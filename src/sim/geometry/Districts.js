/** @module */

import createDistrictGeometry, { makeTracts, updateCensus, updateDistricts, updateVoters } from '../../election/src/districtGeometry/createDistrictGeometry.js'

/**
 * @constructor
 */
export default function Districts(voterShapeList, changes, electionOptionsMan, simOptions) {
    const self = this

    self.districtGeometry = createDistrictGeometry()

    // Update call from sim //
    self.update = () => {
        if (changes.checkNone()) return

        const electionOptions = electionOptionsMan.getOptions()

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

        if (changes.check(['draggables', 'dimensions', 'numTracts'])) {
            const { dimensions } = simOptions
            const voterGeoms = voterShapeList.getGeoms(dimensions)
            self.districtGeometry = updateVoters(self.districtGeometry, voterGeoms, dimensions)
            // todo: maybe make this only trigger when voters change
        }
    }
}
