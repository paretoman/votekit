import voteCasters from './voteCasters.js'

export default function getCanBorders(canPoints, voterGeoms, dimensions, voteCasterName) {
    const { makeCanBorders } = voteCasters[voteCasterName]
    if (makeCanBorders !== undefined) {
        const canBorders = makeCanBorders(canPoints, voterGeoms, dimensions)
        return canBorders
    }
    return {}
}
