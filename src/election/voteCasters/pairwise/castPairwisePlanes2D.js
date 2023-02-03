/** @module */

import { equidistantLine } from '../plurality/CastPluralitySummer2DQuadrature.js'
/**
 * Sum area of voter distributions to tally the votes.
 */
export default function castPairwisePlanes2D({ voterGeom, canGeoms }) {
    // draw lines across shape of voterGeom

    const totalArea = calcVoterTotalArea(voterGeom)

    const n = canGeoms.length

    const winsPairwise = Array(n).fill(0)
    for (let i = 0; i < n; i++) {
        winsPairwise[i] = Array(n).fill(0)
    }

    for (let i = 0; i < n - 1; i++) {
        for (let k = i + 1; k < n; k++) {
            // find split plane

            const plane = eqPlane(canGeoms[i], canGeoms[k])

            const dist = calcDist(plane, voterGeom)

            // find winsPairwise for i and k
            const iArea = calcArea(dist, voterGeom, totalArea)
            const kArea = totalArea - iArea

            winsPairwise[i][k] = iArea
            winsPairwise[k][i] = kArea
        }
    }
    return { winsPairwise, totalVotes: totalArea }
}
function eqPlane(c1, c2) {
    const { A, b } = equidistantLine(c1, c2)
    return [A.x, A.y, -b]
}
function calcDist(plane, voterGeom) {
    // https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
    const numerator = plane[0] * voterGeom.x + plane[1] * voterGeom.y + plane[2]
    const denominator = Math.sqrt(plane[0] ** 2 + plane[1] ** 2)
    return numerator / denominator
}
function calcArea(dist, voterGeom, totalArea) {
    // find the area of the cap of circle,
    // where the area starts at a chord at a distance from the center.

    // https://en.wikipedia.org/wiki/Circular_segment
    const r = voterGeom.w / 2
    if (dist > r) return 0
    if (dist < -r) return totalArea

    // const area = r ** 2 * Math.acos(dist / r) - dist * Math.sqrt(r ** 2 - dist ** 2)
    const d = dist / r
    const normArea = Math.acos(d) - d * Math.sqrt(1 - d ** 2)
    // https://www.desmos.com/calculator
    // y=\arccos(d)-d\sqrt{1-d^{2}}
    const area = r ** 2 * normArea
    return area
}
function calcVoterTotalArea(voterGeom) {
    return Math.PI * (voterGeom.w / 2) ** 2
}
