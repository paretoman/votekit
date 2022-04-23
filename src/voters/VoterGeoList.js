/** @module */

import GeoNoise from './geoNoise.js'
import DistrictMaker from './DistrictMaker.js'
import { range } from '../utilities/jsHelpers.js'
import VoterSimList from './VoterSimList.js'

/**
 * VoterGeoList inherits from VoterSimList.
 * @param {Screen} screen
 * @param {ElectionGeo} electionGeo
 * @constructor
 */
export default function VoterGeoList(screen, electionGeo, sim) {
    const self = this

    // VoterGeoList inherits from VoterSimList
    // because we need to make a list instances of voterGeoBasis,
    // and voterGeoBasis has a component called voter.
    VoterSimList.call(self, sim)

    /** Number of districts */
    const nd = 20

    /** Number of census tracts in x and y */
    self.nx = 20
    self.ny = 20

    // Code that handles drawing districts of equal number of voters.
    self.districtMaker = new DistrictMaker(screen)

    // Code that handles making geographic noise.
    self.geoNoise = new GeoNoise(self.nx, self.ny)
    self.geoNoise.genNoise()

    // Manage VoterBasisSet //

    /** This voter basis is repeated at every census tract on the geo map.
     *  It is altered by translating it in policy space.
     *  */

    // Update VoterGroup Sets //

    let voterSimGroups = []

    /** Make districts and update voter sets */
    self.updateDistricts = () => {
        self.districtMaker.make(self.nx, self.ny, nd)
    }
    self.updateVoters = () => {
        voterSimGroups = self.getVoterSims()
        self.updateFullSet()
        self.updateVotersByDistrict()
        self.updateVotersByTract()
    }

    // We want to copy a set of voter basis objects for each census tract.
    // Then we add a little noise to represent differences due to geography.

    self.updateFullSet = () => {
        const { sn } = self.geoNoise
        self.allVoterGroups = voterSimGroups.map(
            (vb) => sn.map(
                (rowNoise) => rowNoise.map(
                    (cellNoise) => {
                        const [xNoise, yNoise] = cellNoise
                        const shape2 = structuredClone(vb.voterShape.shape2)
                        shape2.x += xNoise
                        shape2.y += yNoise
                        const { shape1 } = vb.voterShape
                        return { shape2, shape1 }
                    },
                ).flat(),
            ).flat(),
        ).flat()
    }

    self.updateVotersByDistrict = () => {
        const { census } = self.districtMaker
        const { sn } = self.geoNoise
        self.voterGroupsByDistrict = range(nd).map(
            (iDistrict) => voterSimGroups.map(
                (vb) => census[iDistrict].map((g) => {
                    const [gx, gy, gf] = g
                    const [xNoise, yNoise] = sn[gx][gy]
                    const shape2 = structuredClone(vb.voterShape.shape2)
                    shape2.x += xNoise
                    shape2.y += yNoise
                    const { shape1 } = vb.voterShape
                    return { shape2, shape1, weight: gf }
                }).flat(),
            ).flat(),
        )
    }

    self.updateVotersByTract = () => {
        const { sn } = self.geoNoise
        self.voterGroupsByTract = sn.map(
            (rowNoise) => rowNoise.map(
                (cellNoise) => voterSimGroups.map(
                    (vb) => {
                        const [xNoise, yNoise] = cellNoise
                        const shape2 = structuredClone(vb.voterShape.shape2)
                        shape2.x += xNoise
                        shape2.y += yNoise
                        const { shape1 } = vb.voterShape
                        return { shape2, shape1 }
                    },
                ).flat(),
            ),
        )
    }
}
