/** @module */

import castPairwisePlanes2D from './castPairwisePlanes2D.js'
import castPairwiseIntervals1D from './castPairwiseIntervals1D.js'
import castPairwiseGrid from './castPairwiseGrid.js'
import * as typesGeometry from '../types/typesGeometry.js'
import * as typesCast from '../types/typesCast.js'
import * as typesVotes from '../types/typesVotes.js'
/**
 * Voters cast votes for candidates.
 * @param {typesGeometry.geometry} geometry - geometry for casting votes
 * @param {typesCast.castOptions} castOptions - options for how to cast votes.
 * @returns {typesVotes.votes} votes
 */
export default function castPairwise(geometry, castOptions) {
    const { canGeoms, voterGeoms, dimensions, parties } = geometry

    const someGaussian2D = voterGeoms.some((v) => v.densityProfile === 'gaussian') && dimensions === 2

    const castRegions = (dimensions === 1)
        ? castPairwiseIntervals1D
        : castPairwisePlanes2D
    const cast = (someGaussian2D) ? castPairwiseGrid : castRegions

    // get fraction of votes for each candidate so we can summarize results
    let totalVotes = 0

    // should ideally make a set of polygons for each ranking so that we avoid repeating rankings.

    const n = canGeoms.length
    const winsPairwise = Array(n).fill(0)
    for (let i = 0; i < n; i++) {
        winsPairwise[i] = Array(n).fill(0)
    }
    const votesByGeom = []
    voterGeoms.forEach((voterGeom, g) => {
        const votesForGeom = cast(voterGeom, geometry, castOptions)
        votesByGeom[g] = votesForGeom
        const { winsPairwise: winsPairwiseForGeom,
            totalVotes: totalVotesForGeom } = votesForGeom

        for (let i = 0; i < n; i++) {
            for (let k = 0; k < n; k++) {
                winsPairwise[i][k] += winsPairwiseForGeom[i][k]
            }
        }
        totalVotes += totalVotesForGeom
    })
    const invTotalCount = 1 / totalVotes
    const winFractionPairwise = winsPairwise.map((x) => x.map((a) => a * invTotalCount))

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
    const pairwiseTallies = { winFractionPairwise }
    const numCans = canGeoms.length
    const votes = { candidateTallies, pairwiseTallies, votesByGeom, parties, numCans }
    return votes
}
