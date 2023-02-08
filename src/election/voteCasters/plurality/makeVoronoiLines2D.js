import equidistantLine from './equidistantLine.js'

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
