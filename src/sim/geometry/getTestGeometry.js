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
    const voterPoint = getGeoms([testVoter], dimensions)[0]
    const canGeoms = candidateList.getGeoms(dimensions)
    const parties = candidateList.getParties()
    const geometry = {
        voterPoint, canGeoms, parties, dimensions,
    }
    return geometry
}
