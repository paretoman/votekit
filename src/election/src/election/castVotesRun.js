import getCanBorders from '../voteCasters/voteCasters/getCanBorders.js'
import voteCasters from '../voteCasters/voteCasters/voteCasters.js'

export default function castVotesRun(geometry, electionPhaseOptions) {
    const { castOptions } = electionPhaseOptions

    const { voteCasterName } = electionPhaseOptions.phaseOptions
    const { canPoints, voterGeoms, dimensions } = geometry

    const geometry2 = { ...geometry }
    const canBorders = getCanBorders(canPoints, voterGeoms, dimensions, voteCasterName)
    geometry2.canBorders = canBorders

    const votes = voteCasters[voteCasterName].cast(geometry2, castOptions)
    return votes
}
