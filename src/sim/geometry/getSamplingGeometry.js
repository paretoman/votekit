import makeCandidateDistributionCDF from '../../election/src/sampleElection/makeCandidateDistributionCDF.js'

/**
 * Get samplingGeometry inputs to sampleElection.
 * @param {*} voterShapeList
 * @param {*} candidateDnList
 * @param {*} simOptions
 * @param {*} districts
 * @returns {Object} samplingGeometry is input for sampleElection
 */
export default function getSamplingGeometry(voterShapeList, candidateDnList, simOptions, electionOptions, districts) {
    const { dimensions } = simOptions
    const { geography } = districts

    const voterGeoms = voterShapeList.getGeoms(dimensions)
    const canDnGeoms = candidateDnList.getGeoms(dimensions)
    const parties = candidateDnList.getParties()

    const canDnCDF = makeCandidateDistributionCDF(canDnGeoms, dimensions)

    const samplingGeometry = { voterGeoms, canDnGeoms, parties, dimensions, geography, canDnCDF }
    return samplingGeometry
}
