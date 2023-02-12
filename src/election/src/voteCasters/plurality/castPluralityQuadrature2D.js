/** @module */

import sumCircle from './sumCircle.js'

/**
 * Sum area of voter distributions to tally the votes.
 * @param {Object[]} canGeoms
 */
export default function castPluralityQuadrature2D(voterGeom, geometry) {
    const lines = geometry.canBorders.voronoiLines2D

    // use lines drawn across shape of voterGeom to sum the area within

    const n = lines.length
    const countByCan = Array(n)
    let totalVotes = 0
    for (let i = 0; i < n; i++) {
        const lineSet = lines[i]
        // return area for each candidate
        const area = sumCircle(voterGeom, lineSet)
        countByCan[i] = area
        totalVotes += area
    }
    return { countByCan, totalVotes }
}
