/** @module */

import DistrictNoise from './DistrictNoise.js'
import { copyObjectShallow } from '../../utilities/jsHelpers.js'
import makeDistrictMap from './makeDistrictMap.js'

/**
 * @param {Screen} screen
 * @constructor
 */
export default function DistrictGeometry() {
    const self = this

    /** Number of districts */
    self.nd = 20

    /** Number of census tracts in x and y */
    self.nx = 20
    self.ny = 20

    // Code that handles making geographic district noise.
    self.districtNoise = new DistrictNoise(self.nx, self.ny)
    self.districtNoise.genNoise()

    // Manage VoterBasisSet //

    /** This voter basis is repeated at every census tract on the district map.
     *  It is altered by translating it in policy space.
     *  */

    // Update VoterGroup Sets //

    /** Make districts and update voter sets */
    self.updateDistricts = (numDistricts) => {
        self.nd = numDistricts
        // Code that handles drawing districts of equal number of voters.
        self.districtMap = makeDistrictMap(self.nx, self.ny, self.nd)
    }

    // We want to copy a set of voter basis objects for each census tract.
    // Then we add a little noise to represent differences due to geography.
    self.updateVoters = (voterShapes) => {
        const { sn } = self.districtNoise
        self.voterGeomsByTract1D = sn.map(
            (rowNoise) => rowNoise.map(
                (cellNoise) => voterShapes.map(
                    (vb) => {
                        const [xNoise] = cellNoise
                        const shape1 = copyObjectShallow(vb.shape1)
                        shape1.x += xNoise
                        return shape1
                    },
                ),
            ),
        )
        self.voterGeomsByTract2D = sn.map(
            (rowNoise) => rowNoise.map(
                (cellNoise) => voterShapes.map(
                    (vb) => {
                        const [xNoise, yNoise] = cellNoise
                        const shape2 = copyObjectShallow(vb.shape2)
                        shape2.x += xNoise
                        shape2.y += yNoise
                        return shape2
                    },
                ),
            ),
        )
    }
}
