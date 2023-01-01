/** @module */

import GeoNoise from './geoNoise.js'
import DistrictMaker from './DistrictMaker.js'
import { copyObjectShallow, range } from '../utilities/jsHelpers.js'

/**
 * @param {Screen} screen
 * @constructor
 */
export default function VoterGeo(voterShapeList, changes) {
    const self = this

    /** Number of districts */
    self.nd = 20

    /** Number of census tracts in x and y */
    self.nx = 20
    self.ny = 20

    // Code that handles drawing districts of equal number of voters.
    self.districtMaker = new DistrictMaker()

    // Code that handles making geographic noise.
    self.geoNoise = new GeoNoise(self.nx, self.ny)
    self.geoNoise.genNoise()

    // Manage VoterBasisSet //

    /** This voter basis is repeated at every census tract on the geo map.
     *  It is altered by translating it in policy space.
     *  */

    // Update call from sim //

    let voterShapes = []

    self.update = () => {
        if (changes.checkNone()) return

        voterShapes = voterShapeList.getVoterShapes()
        if (changes.check(['geo', 'viz', 'dimensions'])) {
            self.updateDistricts()
        }

        self.updateVoters() // todo: maybe make this only trigger when voters change
    }

    // Update VoterGroup Sets //

    /** Make districts and update voter sets */
    self.updateDistricts = () => {
        self.districtMaker.make(self.nx, self.ny, self.nd)
    }
    self.updateVoters = () => {
        self.updateFullSet()
        self.updateVotersByDistrict()
        self.updateVotersByTract()
    }

    // We want to copy a set of voter basis objects for each census tract.
    // Then we add a little noise to represent differences due to geography.

    self.updateFullSet = () => {
        const { sn } = self.geoNoise
        self.allVoterGroups = voterShapes.map(
            (vb) => sn.map(
                (rowNoise) => rowNoise.map(
                    (cellNoise) => {
                        const [xNoise, yNoise] = cellNoise
                        const shape1 = copyObjectShallow(vb.shape1)
                        const shape2 = copyObjectShallow(vb.shape2)
                        shape1.x += xNoise
                        shape2.x += xNoise
                        shape2.y += yNoise
                        return { shape2, shape1 }
                    },
                ).flat(),
            ).flat(),
        ).flat()
    }

    self.updateVotersByDistrict = () => {
        const { census } = self.districtMaker
        const { sn } = self.geoNoise
        self.voterGroupsByDistrict = range(self.nd).map(
            (iDistrict) => voterShapes.map(
                (vb) => census[iDistrict].map((g) => {
                    const [gx, gy, gf] = g
                    const [xNoise, yNoise] = sn[gx][gy]
                    const shape1 = copyObjectShallow(vb.shape1)
                    const shape2 = copyObjectShallow(vb.shape2)
                    shape1.x += xNoise
                    shape2.x += xNoise
                    shape2.y += yNoise
                    return { shape2, shape1, weight: gf }
                }).flat(),
            ).flat(),
        )
    }

    self.updateVotersByTract = () => {
        const { sn } = self.geoNoise
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
                ).flat(),
            ),
        )
    }
}
