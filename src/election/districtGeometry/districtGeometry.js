/** @module */

import DistrictNoise from './DistrictNoise.js'
import DistrictMaker from './DistrictMaker.js'
import { copyObjectShallow } from '../../utilities/jsHelpers.js'

/**
 * @param {Screen} screen
 * @constructor
 */
export default function DistrictGeometry(voterShapeList, changes, electionOptions) {
    const self = this

    /** Number of districts */
    self.nd = 20

    /** Number of census tracts in x and y */
    self.nx = 20
    self.ny = 20

    // Code that handles drawing districts of equal number of voters.
    self.districtMaker = new DistrictMaker()

    // Code that handles making geographic district noise.
    self.districtNoise = new DistrictNoise(self.nx, self.ny)
    self.districtNoise.genNoise()

    // Manage VoterBasisSet //

    /** This voter basis is repeated at every census tract on the district map.
     *  It is altered by translating it in policy space.
     *  */

    // Update call from sim //

    let voterShapes = []

    self.update = () => {
        if (changes.checkNone()) return

        voterShapes = voterShapeList.getEntities()
        if (changes.check(['numDistricts', 'mode', 'dimensions'])) {
            self.updateDistricts()
        }

        self.updateVoters() // todo: maybe make this only trigger when voters change
    }

    // Update VoterGroup Sets //

    /** Make districts and update voter sets */
    self.updateDistricts = () => {
        self.nd = electionOptions.numDistricts
        self.districtMaker.make(self.nx, self.ny, self.nd)
    }

    // We want to copy a set of voter basis objects for each census tract.
    // Then we add a little noise to represent differences due to geography.
    self.updateVoters = () => {
        const { sn } = self.districtNoise
        self.voterGroupsByTract = sn.map(
            (rowNoise) => rowNoise.map(
                (cellNoise) => voterShapes.map(
                    (vb) => {
                        const [xNoise, yNoise] = cellNoise
                        const shape1 = copyObjectShallow(vb.shape1)
                        const shape2 = copyObjectShallow(vb.shape2)
                        shape1.x += xNoise
                        shape2.x += xNoise
                        shape2.y += yNoise
                        return { shape2, shape1 }
                    },
                ),
            ),
        )
    }
}
