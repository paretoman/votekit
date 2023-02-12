import getCanBorders from '../../election/src/voteCasters/voteCasters/getCanBorders.js'

/**
 * Get geometry inputs to election. Both candidateList and candidateDnList work here, though we call both canGeoms.
 * @param {*} voterShapeList
 * @param {*} candidateList
 * @param {*} simOptions
 * @param {*} districts
 * @returns
 */
export default function getGeometry(voterShapeList, candidateList, simOptions, electionOptions, districts) {
    const { dimensions } = simOptions
    const { districtGeometry } = districts

    const voterGeoms = voterShapeList.getGeoms(dimensions)
    const canGeoms = candidateList.getGeoms(dimensions)
    const parties = candidateList.getParties()
    const canBorders = getCanBorders(canGeoms, voterGeoms, dimensions, electionOptions)

    const geometry = { voterGeoms, canGeoms, parties, dimensions, canBorders, districtGeometry }
    return geometry
}
