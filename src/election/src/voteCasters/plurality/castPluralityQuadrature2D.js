/** @module */

import sumCircle from './sumCircle.js'
import * as typesVotesForGeom from '../types/typesVotesForGeom.js'

/**
 * Sum area of voter distributions to tally the votes.
 * @returns {typesVotesForGeom.votesForGeomPlurality}
 */
export default function castPluralityQuadrature2D(voterGeom, geometry) {
    const lines = geometry.canBorders.voronoiLines2D
    const { densityMax } = voterGeom
    // use lines drawn across shape of voterGeom to sum the area within

    const n = lines.length
    const countByCan = Array(n)
    let totalVotes = 0
    for (let i = 0; i < n; i++) {
        const lineSet = lines[i]
        // return area for each candidate
        const area = sumCircle(voterGeom, lineSet)
        const voteCount = area * densityMax
        countByCan[i] = voteCount
        totalVotes += voteCount
    }
    return { countByCan, totalVotes }
}
