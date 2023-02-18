import equidistantLine from './equidistantLine.js'
import * as typesGeoms from '../types/typesGeoms.js'
import * as typesCanBorders from '../types/typesCanBorders.js'
/**
 * Each pair of candidates defines a potential line for the voronoi diagram.
 * @param {typesGeoms.canGeom2D[]} canGeoms
 * @returns {typesCanBorders.voronoiLines2D}
 */
export default function makeVoronoiLines2D(canGeoms) {
    // find all lines
    const n = canGeoms.length
    const lines = new Array(n) // each candidate has a set of lines for themselves
    for (let i = 0; i < n; i++) {
        lines[i] = []
        for (let k = 0; k < n; k++) {
            // skip sames
            if (i === k) continue
            // find equation for a line
            const c1 = canGeoms[i]
            const c2 = canGeoms[k]
            // lines[i][k] = equidistantLine(c1,c2) // problem when i === k
            lines[i].push(equidistantLine(c1, c2))
        }
    }
    return lines
}
