/**
 * Get geometry inputs to election. Both candidateList and candidateDnList work here, though we call both canGeoms.
 * @param {*} voterShapeList
 * @param {*} candidateList
 * @param {*} simOptions
 * @param {*} voterGeo
 * @returns
 */
export default function getGeometry(voterShapeList, candidateList, simOptions, voterGeo) {
    const { dimensions, geo } = simOptions
    const voterGeoms = voterShapeList.getGeoms(dimensions)
    const canGeoms = candidateList.getGeoms(dimensions)
    const parties = candidateList.getParties()
    const geometry = {
        voterGeoms, canGeoms, parties, dimensions,
    }
    if (geo) geometry.voterGeo = voterGeo
    return geometry
}
