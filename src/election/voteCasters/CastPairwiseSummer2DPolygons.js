/** @module */

import { equidistantLine } from './CastPluralitySummer2DQuadrature.js'
/**
 * Sum area of voter distributions to tally the votes.
 * @param {Object[]} canGeoms
 * @constructor
 */
export default function CastPairwiseSummer2DPolygons(canGeoms) {
    const self = this

    self.sumArea = function sumArea(voterGeom) {
        // draw lines across shape of voterGeom

        const totalCountForGeom = calcVoterTotalArea(voterGeom)

        const n = canGeoms.length

        const winsPairwiseForGeom = Array(n).fill(0)
        for (let i = 0; i < n; i++) {
            winsPairwiseForGeom[i] = Array(n).fill(0)
        }

        for (let i = 0; i < n - 1; i++) {
            for (let k = i + 1; k < n; k++) {
            // find split plane

                const plane = eqPlane(canGeoms[i], canGeoms[k])

                const dist = calcDist(plane, voterGeom)

                // find winsPairwiseForGeom for i and k
                const iWins = calcArea(dist, voterGeom, totalCountForGeom)
                const kWins = totalCountForGeom - iWins

                winsPairwiseForGeom[i][k] = iWins
                winsPairwiseForGeom[k][i] = kWins
            }
        }
        return { winsPairwiseForGeom, totalCountForGeom }
    }
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
