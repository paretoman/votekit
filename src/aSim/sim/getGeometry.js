/**
 * Get geometry inputs to election. Both candidateList and candidateDnList work here, though we call both canGeoms.
 * @param {*} voterShapeList
 * @param {*} candidateList
 * @param {*} simOptions
 * @param {*} voterDistricts
 * @returns
 */
export default function getGeometry(voterShapeList, candidateList, simOptions, voterDistricts) {
    const { dimensions, useDistricts } = simOptions
    const voterGeoms = voterShapeList.getGeoms(dimensions)
    const canGeoms = candidateList.getGeoms(dimensions)
    const parties = candidateList.getParties()
    const geometry = {
        voterGeoms, canGeoms, parties, dimensions,
    }
    if (useDistricts) geometry.voterDistricts = voterDistricts
    return geometry
}
