/** @module */

import districtCensus from './districtCensus.js'
import makeDistrictMap from './makeDistrictMap.js'
import makeTractNoise from './makeTractNoise.js'
import makeVoterGeomsByTract from './makeVoterGeomsByTract.js'

/** Make tracts */
export default function createGeography(electionOptions, voterGeoms, dimensions) {
    const { numTracts, numDistricts } = electionOptions
    const nx = numTracts
    const ny = numTracts
    const tractNoise = makeTractNoise(nx, ny)
    const districtMap = makeDistrictMap(numDistricts)
    const census = districtCensus(districtMap, nx, ny)
    const voterGeomsByTract = makeVoterGeomsByTract(voterGeoms, tractNoise, dimensions)
    const geography = { nx, ny, tractNoise, districtMap, census, voterGeomsByTract }
    return geography
}

export function makeTracts(geography0, numTracts) {
    const geography = { ...geography0 }

    /** Number of census tracts in x and y */
    const nx = numTracts
    const ny = numTracts

    // Code that handles making geographic district noise.
    const tractNoise = makeTractNoise(nx, ny)

    geography.nx = nx
    geography.ny = ny
    geography.tractNoise = tractNoise
    return geography
}

/** Make districts */
export function updateDistricts(geography0, numDistricts) {
    const geography = { ...geography0 }

    geography.districtMap = makeDistrictMap(numDistricts)
    return geography
}

/** update census */
export function updateCensus(geography0) {
    const geography = { ...geography0 }

    const { districtMap, nx, ny } = geography
    geography.census = districtCensus(districtMap, nx, ny)
    return geography
}

/** Update VoterGeoms for each Tract */
export function updateVoters(geography0, voterGeoms, dimensions) {
    const geography = { ...geography0 }

    const { tractNoise } = geography
    geography.voterGeomsByTract = makeVoterGeomsByTract(voterGeoms, tractNoise, dimensions)
    return geography
}
