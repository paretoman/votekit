/** @module */

import districtCensus from './districtCensus.js'
import makeDistrictMap from './makeDistrictMap.js'
import makeTractNoise from './makeTractNoise.js'
import makeVoterGeomsByTract from './makeVoterGeomsByTract.js'

/** Make tracts */
export default function createDistrictGeometry() {
    return {}
}

export function makeTracts(districtGeometry0, numTracts) {
    const districtGeometry = { ...districtGeometry0 }

    /** Number of census tracts in x and y */
    const nx = numTracts
    const ny = numTracts

    // Code that handles making geographic district noise.
    const tractNoise = makeTractNoise(nx, ny)

    districtGeometry.nx = nx
    districtGeometry.ny = ny
    districtGeometry.tractNoise = tractNoise
    return districtGeometry
}

/** Make districts */
export function updateDistricts(districtGeometry0, numDistricts) {
    const districtGeometry = { ...districtGeometry0 }

    districtGeometry.districtMap = makeDistrictMap(numDistricts)
    return districtGeometry
}

/** update census */
export function updateCensus(districtGeometry0) {
    const districtGeometry = { ...districtGeometry0 }

    const { districtMap, nx, ny } = districtGeometry
    districtGeometry.census = districtCensus(districtMap, nx, ny)
    return districtGeometry
}

/** Update VoterGeoms for each Tract */
export function updateVoters(districtGeometry0, voterGeoms, dimensions) {
    const districtGeometry = { ...districtGeometry0 }

    const { tractNoise } = districtGeometry
    districtGeometry.voterGeomsByTract = makeVoterGeomsByTract(voterGeoms, tractNoise, dimensions)
    return districtGeometry
}
