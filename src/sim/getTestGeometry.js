import getGeoms from '../entities.js/getGeoms.js'

/**
 * Get geometry inputs to election. Both candidateList and candidateDnList work here, though we call both canGeoms.
 * @param {*} voterShapeList
 * @param {*} candidateList
 * @param {*} simOptions
 * @param {*} voterDistricts
 * @returns
 */
export default function getTestGeometry(voterTest, candidateList, simOptions) {
    const { dimensions } = simOptions
    const voterGeom = getGeoms([voterTest], dimensions)[0]
    const canGeoms = candidateList.getGeoms(dimensions)
    const parties = candidateList.getParties()
    const geometry = {
        voterGeom, canGeoms, parties, dimensions,
    }
    return geometry
}
