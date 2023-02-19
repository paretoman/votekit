import getGeoms from '../entities/getGeoms.js'

/**
 * Get geometry inputs to election. Both candidateList and candidateDnList work here, though we call both canGeoms.
 * @param {*} voterShapeList
 * @param {*} candidateList
 * @param {*} simOptions
 * @returns {Object} geometry is input for castTestVote
 */
export default function getTestGeometry(testVoter, candidateList, simOptions) {
    const { dimensions } = simOptions
    const voterGeom = getGeoms([testVoter], dimensions)[0]
    const voterPoint = (dimensions === 1)
        ? voterGeom.x
        : [voterGeom.x, voterGeom.y]
    const canGeoms = candidateList.getGeoms(dimensions)
    const canPoints = (dimensions === 1)
        ? canGeoms.map((c) => c.x)
        : canGeoms.map((c) => [c.x, c.y])
    const parties = candidateList.getParties()
    const testGeometry = {
        voterPoint, canPoints, parties, dimensions,
    }
    return testGeometry
}
