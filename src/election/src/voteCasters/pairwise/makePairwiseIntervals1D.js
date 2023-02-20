import * as typesCanBorders from '../types/typesCanBorders.js'
/**
 * divide voterGeom
 * compute the midpoints
 * identify which candidate is smaller in x value
 * @param {number[]} canPoints
 * @returns {typesCanBorders.pairwiseIntervals1D}
 */
export default function makePairwiseIntervals1D(canPoints) {
    const n = canPoints.length
    const midpoints = Array(n - 1)
    const iLower = Array(n - 1)
    for (let i = 0; i < n - 1; i++) {
        midpoints[i] = Array(n - i - 1)
        iLower[i] = Array(n - i - 1)
        for (let k = i + 1; k < n; k++) {
            const ix = canPoints[i]
            const kx = canPoints[k]
            const midpoint = 0.5 * (ix + kx)
            midpoints[i][k] = midpoint
            iLower[i][k] = (ix < kx)
        }
    }
    const pairwiseIntervals1D = { midpoints, iLower }
    return pairwiseIntervals1D
}
