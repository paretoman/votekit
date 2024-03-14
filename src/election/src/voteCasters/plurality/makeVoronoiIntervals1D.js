import { range } from '../../utilities/mathHelpers.js'

/** Find boundary between candidates */
export default function makeVoronoiIntervals1D(canPoints) {
    const n = canPoints.length
    const iSorted = range(n).sort((a, b) => canPoints[a] - canPoints[b])
    const midpoints = new Array(n - 1)
    for (let i = 0; i < n - 1; i++) {
        midpoints[i] = (canPoints[iSorted[i]] + canPoints[iSorted[i + 1]]) * 0.5
    }
    const intervals = new Array(n)
    for (let i = 0; i < n; i++) {
        const lower = (i === 0) ? -Infinity : midpoints[i - 1]
        const upper = (i === n - 1) ? Infinity : midpoints[i]
        intervals[iSorted[i]] = { lower, upper }
    }

    return intervals
}
