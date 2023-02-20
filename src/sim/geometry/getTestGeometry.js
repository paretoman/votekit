import getPoints from '../entities/getPoints.js'

/**
 * Get geometry inputs to election.
 * @param {*} voterShapeList
 * @param {*} candidateList
 * @param {*} simOptions
 * @returns {Object} geometry is input for castTestVote
 */
export default function getTestGeometry(testVoter, candidateList, simOptions) {
    const { dimensions } = simOptions
    const voterPoint = getPoints([testVoter], dimensions)[0]
    const canPoints = candidateList.getPoints(dimensions)
    const parties = candidateList.getParties()
    const testGeometry = {
        voterPoint, canPoints, parties, dimensions,
    }
    return testGeometry
}
