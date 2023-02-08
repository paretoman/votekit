/** @module */

import makeDistrictMap from './makeDistrictMap.js'
import makeTractNoise from './makeTractNoise.js'
import makeVoterGeomsByTract from './makeVoterGeomsByTract.js'

/**
 * @constructor
 */
export default function DistrictGeometry() {
    const self = this

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

    /** Update VoterGeoms for each Tract */
    self.updateVoters = (voterGeoms, dimensions) => {
        self.voterGeomsByTract = makeVoterGeomsByTract(voterGeoms, self.tractNoise, dimensions)
    }
}
