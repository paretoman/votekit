import getCanBorders from '../../election/src/voteCasters/voteCasters/getCanBorders.js'

/**
 * Get samplingGeometry inputs to sampleElection.
 * @param {*} voterShapeList
 * @param {*} candidateDnList
 * @param {*} simOptions
 * @param {*} districts
 * @returns
 */
export default function getSamplingGeometry(voterShapeList, candidateDnList, simOptions, electionOptions, districts) {
    const { dimensions } = simOptions
    const { geography } = districts

    const voterGeoms = voterShapeList.getGeoms(dimensions)
    const canDnGeoms = candidateDnList.getGeoms(dimensions)
    const parties = candidateDnList.getParties()
    const canBorders = getCanBorders(canDnGeoms, voterGeoms, dimensions, electionOptions)

    const samplingGeometry = { voterGeoms, canDnGeoms, parties, dimensions, canBorders, geography }
    return samplingGeometry
}
