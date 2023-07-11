import getUsePollsByPhase from './getUsePollsByPhase.js'

/**
 * Get geometry inputs to election.
 * @param {*} voterShapeList
 * @param {*} candidateList
 * @param {*} simOptions
 * @param {*} districts
 * @returns {Object} geometry is input for an election
 */
export default function getGeometry(voterShapeList, candidateList, simOptions, electionOptions, districts) {
    const { dimensions, seeds } = simOptions
    const { geography } = districts
    const { sequenceOptions } = electionOptions

    const voterGeoms = voterShapeList.getGeoms(dimensions)
    const voterParties = voterShapeList.getParties()
    const voterStrategyListByPhase = voterShapeList.getVoterStrategyListByPhase(sequenceOptions)
    const information = null
    const usePollsByPhase = getUsePollsByPhase(voterStrategyListByPhase)

    const canPoints = candidateList.getPoints(dimensions)
    const parties = candidateList.getParties()
    const canLabels = candidateList.getLabels()

    const strategySeed = `pumpkin${seeds[0]}` // todo: use seeds[1] for strategySeed
    const geometry = { voterGeoms, voterParties, canPoints, parties, canLabels, dimensions, geography, strategySeed, voterStrategyListByPhase, information, usePollsByPhase }
    return geometry
}
