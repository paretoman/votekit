import voteCasters from './voteCasters.js'

export default function getCanBorders(canGeoms, voterGeoms, dimensions, electionOptions) {
    const { voteCasterName } = electionOptions
    const { makeCanBorders } = voteCasters[voteCasterName]
    if (makeCanBorders !== undefined) {
        const canBorders = makeCanBorders(canGeoms, voterGeoms, dimensions)
        return canBorders
    }
    return {}
}
