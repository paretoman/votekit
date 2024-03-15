import * as types from '@paretoman/votekit-types'
import equidistantLine from './equidistantLine.js'
/**
 * Each pair of candidates defines a potential line for the voronoi diagram.
 * @param {number[][]} canPoints
 * @returns {types.typesCanBorders.voronoiLines2D}
 */
export default function makeVoronoiLines2D(canPoints) {
    // find all lines
    const n = canPoints.length
    const lines = new Array(n) // each candidate has a set of lines for themselves
    for (let i = 0; i < n; i++) {
        lines[i] = []
        for (let k = 0; k < n; k++) {
            // skip sames
            if (i === k) continue
            // find equation for a line
            const c1 = canPoints[i]
            const c2 = canPoints[k]
            // lines[i][k] = equidistantLine(c1,c2) // problem when i === k
            lines[i].push(equidistantLine(c1, c2))
        }
    }
    return lines
}
