/** @module */

import * as types from '@paretoman/votekit-types'
import castPairwisePlanes2D from './castPairwisePlanes2D.js'
import castPairwiseIntervals1D from './castPairwiseIntervals1D.js'
import castPairwiseGrid from './castPairwiseGrid.js'
/**
 * Voters cast votes for candidates.
 * @param {types.typesGeometry.geometry} geometry - geometry for casting votes
 * @param {types.typesCast.castOptions} castOptions - options for how to cast votes.
 * @returns {types.typesVotes.votes} votes
 */
export default function castPairwise(geometry, castOptions) {
    const { canPoints, voterGeoms, dimensions, parties } = geometry
    const { verbosity } = castOptions

    const someGaussian2D = voterGeoms.some((v) => v.densityProfile === 'gaussian') && dimensions === 2

    const castRegions = (dimensions === 1)
        ? castPairwiseIntervals1D
        : castPairwisePlanes2D
    const cast = (someGaussian2D) ? castPairwiseGrid : castRegions

    // get fraction of votes for each candidate so we can summarize results
    let totalVotes = 0

    // should ideally make a set of polygons for each ranking so that we avoid repeating rankings.

    const n = canPoints.length
    const winsPairwise = Array(n).fill(0)
    for (let i = 0; i < n; i++) {
        winsPairwise[i] = Array(n).fill(0)
    }
    const votesByGeom = []
    voterGeoms.forEach((voterGeom, g) => {
        const votesForGeom = cast(voterGeom, geometry, castOptions)
        const { winsPairwise: winsPairwiseForGeom,
            totalVotes: totalVotesForGeom } = votesForGeom

        for (let i = 0; i < n; i++) {
            for (let k = 0; k < n; k++) {
                winsPairwise[i][k] += winsPairwiseForGeom[i][k]
            }
        }
        totalVotes += totalVotesForGeom

        if (verbosity < 2) return

        votesByGeom[g] = votesForGeom
    })
    const invTotalCount = 1 / totalVotes
    const winFractionPairwise = winsPairwise.map((x) => x.map((a) => a * invTotalCount))

    const pairwiseTallies = { winFractionPairwise }
    const numCans = canPoints.length
    const votes = { pairwiseTallies, parties, numCans }
    if (verbosity < 1) return votes

    // borda scores
    const bordaScoreSumByCan = Array(n).fill(0)
    const bordaFractionAverageByCan = Array(n)
    const invTotalCountTimesNMinus1 = invTotalCount / (n - 1)
    for (let i = 0; i < n; i++) {
        for (let k = 0; k < n; k++) {
            bordaScoreSumByCan[i] += winsPairwise[i][k]
        }
        bordaFractionAverageByCan[i] = bordaScoreSumByCan[i] * invTotalCountTimesNMinus1
    }
    const candidateTallies = { bordaFractionAverageByCan }
    votes.candidateTallies = candidateTallies
    if (verbosity < 2) return votes

    votes.votesByGeom = votesByGeom
    return votes
}
