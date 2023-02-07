import voteCasters from './voteCasters.js'

export default function getCanBorders(geometry, electionOptions) {
    const { voteCasterName } = electionOptions
    const { makeCanBorders } = voteCasters[voteCasterName]
    if (makeCanBorders !== undefined) {
        const canBorders = makeCanBorders(geometry)
        return canBorders
    }
    return {}
}
