/** @module */

import castPluralityIntervals1D from './castPluralityIntervals1D.js'
import castPluralityQuadrature2D from './castPluralityQuadrature2D.js'
import castPluralityGrid from './castPluralityGrid.js'
import * as typesGeometry from '../types/typesGeometry.js'
import * as typesCast from '../types/typesCast.js'
import * as typesVotes from '../types/typesVotes.js'

/**
 * Vote for one.
 * Voters cast votes for candidates.
 * @param {typesGeometry.geometry} geometry - geometry for casting votes
 * @param {typesCast.castOptions} castOptions - options for how to cast votes.
 * @returns {typesVotes.votes} votes
 */
export default function castPlurality(geometry, castOptions) {
    const { canGeoms, voterGeoms, dimensions, parties } = geometry

    const someGaussian2D = voterGeoms.some((v) => v.densityProfile === 'gaussian') && dimensions === 2

    const castRegions = (dimensions === 1)
        ? castPluralityIntervals1D
        : castPluralityQuadrature2D
    const cast = (someGaussian2D) ? castPluralityGrid : castRegions

    // get fraction of votes for each candidate so we can summarize results
    const n = canGeoms.length
    const votesByGeom = []
    const countByCan = (new Array(n)).fill(0)
    let totalVotes = 0
    for (let i = 0; i < voterGeoms.length; i++) {
        const voterGeom = voterGeoms[i]

        const votesForGeom = cast(voterGeom, geometry, castOptions)
        votesByGeom[i] = votesForGeom
        const { countByCan: countByCanForGeom,
            totalVotes: totalVotesForGeom } = votesForGeom

        for (let k = 0; k < n; k++) {
            countByCan[k] += countByCanForGeom[k]
        }
        totalVotes += totalVotesForGeom
    }
    const voteFractionsByCan = countByCan.map((x) => x / totalVotes)

    const candidateTallies = { voteFractionsByCan }
    const numCans = canGeoms.length
    const votes = { candidateTallies, votesByGeom, parties, numCans }
    return votes
}
