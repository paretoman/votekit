/** @module */

import { copyObjectShallow } from '../../utilities/jsHelpers.js'
import makeDistrictMap from './makeDistrictMap.js'
import makeTractNoise from './DistrictNoise.js'

/**
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
    self.tractNoise = makeTractNoise(self.nx, self.ny)

    /** Make districts and update voter sets */
    self.updateDistricts = (numDistricts) => {
        self.nd = numDistricts
        // Code that handles drawing districts of equal number of voters.
        self.districtMap = makeDistrictMap(self.nx, self.ny, self.nd)
    }

    // Update VoterGroup Sets //

    /** The set of voter basis geoms is repeated at every census tract on the district map,
     *  but it is altered by translating it in policy space with a little noise
     * to represent differences due to geomgraphy
     *  */
    self.updateVoters = (voterShapes, dimensions) => {
        if (dimensions === 1) {
            self.voterGeomsByTract = self.tractNoise.map(
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
        } else {
            self.voterGeomsByTract = self.tractNoise.map(
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
}
