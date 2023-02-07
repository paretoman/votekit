/** @module */

import DistrictGeometry from '../../election/districtGeometry/districtGeometry.js'

/**
 * @constructor
 */
export default function Districts(voterShapeList, changes, electionOptions, simOptions) {
    const self = this

    self.districtGeometry = new DistrictGeometry()

    let firstRun = true

    // Update call from sim //
    self.update = () => {
        if (electionOptions.useDistricts === false) return
        if (changes.checkNone()) return

        if (changes.check(['numDistricts'])) {
            const { numDistricts } = electionOptions
            self.districtGeometry.updateDistricts(numDistricts)
        }
        if (firstRun || changes.check(['draggables', 'dimensions'])) {
            firstRun = false
            const voterShapes = voterShapeList.getEntities()
            const { dimensions } = simOptions
            self.districtGeometry.updateVoters(voterShapes, dimensions)
            // todo: maybe make this only trigger when voters change
        }
    }
}
