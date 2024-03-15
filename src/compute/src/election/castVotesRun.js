import voteCasters, { getCanBorders } from '@paretoman/votekit-vote-casters'

export default function castVotesRun(geometry, electionOptions, castOptions) {
    const { voteCasterName } = electionOptions
    const { canPoints, voterGeoms, dimensions } = geometry

    const geometry2 = { ...geometry }
    const canBorders = getCanBorders(canPoints, voterGeoms, dimensions, voteCasterName)
    geometry2.canBorders = canBorders

    const votes = voteCasters[voteCasterName].cast(geometry2, castOptions)
    return votes
}
