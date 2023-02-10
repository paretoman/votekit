/** @module */

import createDistrictGeometry, { updateDistricts, updateVoters } from '../../election/districtGeometry/createDistrictGeometry.js'

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
        if (electionOptions.useDistricts === false) return
        if (changes.checkNone()) return

        if (changes.check(['numDistricts'])) {
            const { numDistricts } = electionOptions
            self.districtGeometry = updateDistricts(self.districtGeometry, numDistricts)
        }
        if (firstRun || changes.check(['draggables', 'dimensions'])) {
            firstRun = false
            const { dimensions } = simOptions
            const voterGeoms = voterShapeList.getGeoms(dimensions)
            self.districtGeometry = updateVoters(self.districtGeometry, voterGeoms, dimensions)
            // todo: maybe make this only trigger when voters change
        }
    }
}
