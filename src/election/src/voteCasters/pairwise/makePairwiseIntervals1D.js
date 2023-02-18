/**
 * divide voterGeom
 * compute the midpoints
 * identify which candidate is smaller in x value
 * @param {Object[]} canGeoms
 * @returns {pairwiseIntervals1D}
 */
export default function makePairwiseIntervals1D(canGeoms) {
    const n = canGeoms.length
    const midpoints = Array(n - 1)
    const iLower = Array(n - 1)
    for (let i = 0; i < n - 1; i++) {
        midpoints[i] = Array(n - i - 1)
        iLower[i] = Array(n - i - 1)
        for (let k = i + 1; k < n; k++) {
            const ix = canGeoms[i].x
            const kx = canGeoms[k].x
            const midpoint = 0.5 * (ix + kx)
            midpoints[i][k] = midpoint
            iLower[i][k] = (ix < kx)
        }
    }
    const pairwiseIntervals1D = { midpoints, iLower }
    return pairwiseIntervals1D
}