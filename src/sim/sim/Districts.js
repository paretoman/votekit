/** @module */

import DistrictGeometry from '../../election/districtGeometry/districtGeometry.js'

/**
 * @constructor
 */
export default function Districts(voterShapeList, changes, electionOptions) {
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
        if (firstRun || changes.check(['draggables'])) {
            firstRun = false
            const voterShapes = voterShapeList.getEntities()
            self.districtGeometry.updateVoters(voterShapes)
            // todo: maybe make this only trigger when voters change
        }
    }
}
