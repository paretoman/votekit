import { range } from '../../../utilities/jsHelpers.js'

/** Find boundary between candidates */
export default function makeVoronoiIntervals1D(canGeoms) {
    const n = canGeoms.length
    const iSorted = range(n).sort((a, b) => canGeoms[a].x - canGeoms[b].x)
    const midpoints = new Array(n - 1)
    for (let i = 0; i < n - 1; i++) {
        midpoints[i] = (canGeoms[iSorted[i]].x + canGeoms[iSorted[i + 1]].x) * 0.5
    }
    const intervals = new Array(n)
    for (let i = 0; i < n; i++) {
        const lower = (i === 0) ? -Infinity : midpoints[i - 1]
        const upper = (i === n - 1) ? Infinity : midpoints[i]
        intervals[iSorted[i]] = { lower, upper }
    }

    return intervals
}
