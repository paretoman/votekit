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
    const { dimensions, seeds } = simOptions
    const { geography } = districts
    const { voteCasterName } = electionOptions

    const voterGeoms = voterShapeList.getGeoms(dimensions)
    const voterStrategyList = voterShapeList.getVoterStrategyList(voteCasterName)
    const usePolls = voterStrategyList.some(
        (v) => v.actionList.some(
            (a) => (a.actionName !== 'closest' && a.actionWeight !== 0),
        ),
    )

    const canDnGeoms = candidateDnList.getGeoms(dimensions)
    const parties = candidateDnList.getParties()

    const canDnCDF = makeCandidateDistributionCDF(canDnGeoms, dimensions)

    const samplingSeed = `apple${seeds[0]}`
    const strategySeed = `pumpkin${seeds[0]}` // todo: use seeds[1] for strategySeed

    const samplingGeometry = { voterGeoms, canDnGeoms, parties, dimensions, geography, canDnCDF, samplingSeed, strategySeed, voterStrategyList, usePolls }
    return samplingGeometry
}
