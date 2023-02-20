import getCanBorders from '../../election/src/voteCasters/voteCasters/getCanBorders.js'

/**
 * Get geometry inputs to election.
 * @param {*} voterShapeList
 * @param {*} candidateList
 * @param {*} simOptions
 * @param {*} districts
 * @returns {Object} geometry is input for an election
 */
export default function getGeometry(voterShapeList, candidateList, simOptions, electionOptions, districts) {
    const { dimensions } = simOptions
    const { geography } = districts

    const voterGeoms = voterShapeList.getGeoms(dimensions)
    const canPoints = candidateList.getPoints(dimensions)
    const parties = candidateList.getParties()
    const canBorders = getCanBorders(canPoints, voterGeoms, dimensions, electionOptions)

    const geometry = { voterGeoms, canPoints, parties, dimensions, canBorders, geography }
    return geometry
}
