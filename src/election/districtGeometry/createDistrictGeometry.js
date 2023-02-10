/** @module */

import makeDistrictMap from './makeDistrictMap.js'
import makeTractNoise from './makeTractNoise.js'
import makeVoterGeomsByTract from './makeVoterGeomsByTract.js'

export default function createDistrictGeometry() {
    /** Number of census tracts in x and y */
    const nx = 20
    const ny = 20

    // Code that handles making geographic district noise.
    const tractNoise = makeTractNoise(nx, ny)

    const districtGeometry = { nx, ny, tractNoise }

    return districtGeometry
}

/** Make districts */
export function updateDistricts(districtGeometry0, numDistricts) {
    const { nx, ny } = districtGeometry0
    const nd = numDistricts

    const districtGeometry = { ...districtGeometry0 }
    districtGeometry.nd = nd
    districtGeometry.districtMap = makeDistrictMap(nx, ny, nd)
    return districtGeometry
}

/** Update VoterGeoms for each Tract */
export function updateVoters(districtGeometry0, voterGeoms, dimensions) {
    const { tractNoise } = districtGeometry0

    const districtGeometry = { ...districtGeometry0 }
    districtGeometry.voterGeomsByTract = makeVoterGeomsByTract(voterGeoms, tractNoise, dimensions)
    return districtGeometry
}
