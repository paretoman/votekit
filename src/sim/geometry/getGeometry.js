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
    const { voteCasterName } = electionOptions.sequenceOptions.phases.general // todo: make this more general

    const voterGeoms = voterShapeList.getGeoms(dimensions)
    const voterStrategyList = voterShapeList.getVoterStrategyList(voteCasterName)
    const information = null
    const usePolls = voterStrategyList.some(
        (v) => v.strategy.some(
            (a) => (a.actionName !== 'closest' && a.actionWeight !== 0),
        ),
    )

    const canPoints = candidateList.getPoints(dimensions)
    const parties = candidateList.getParties()

    const strategySeed = `pumpkin${seeds[0]}` // todo: use seeds[1] for strategySeed
    const geometry = { voterGeoms, canPoints, parties, dimensions, geography, strategySeed, voterStrategyList, information, usePolls }
    return geometry
}
