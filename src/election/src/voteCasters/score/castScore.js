/** @module */

import castScoreGrid from './castScoreGrid.js'

// The main difference between this and plurality is we need to return a grid from here.
// We also will return a set of votes from that grid.

/**
 * Voters cast votes for candidates.
 * @param {Object} geometry - geometry for casting votes
 * @param {Object[]} geometry.canGeoms - For 2D, an array of objects: {x,y}.
 * For 1D, an array of objects: {x}.
 * @param {Object[]} geometry.voterGeoms - For 2D, an array of objects: {x,y,w}.
 * For 1D, an array of objects: {x,w,densityProfile}.
 * @param {Object} geometry.parties
 * @param {Object} castOptions - options for how to cast votes.
 * @returns {Object} votes
 */
export default function castScore(geometry, castOptions) {
    const { canGeoms, voterGeoms, parties } = geometry

    // get fraction of votes for each candidate so we can summarize results
    const n = canGeoms.length
    const votesByGeom = []
    const scoreSumByCan = (new Array(n)).fill(0)
    let totalVotes = 0
    for (let i = 0; i < voterGeoms.length; i++) {
        const voterGeom = voterGeoms[i]

        const votesForGeom = castScoreGrid(voterGeom, geometry, castOptions)
        votesByGeom[i] = votesForGeom
        const { totalVotes: totalVotesForGeom,
            scoreSumByCan: scoreSumByCanForGeom } = votesForGeom

        for (let k = 0; k < n; k++) {
            scoreSumByCan[k] += scoreSumByCanForGeom[k]
        }
        totalVotes += totalVotesForGeom
    }
    const maxScore = 1
    const scoreFractionAverageByCan = scoreSumByCan.map((x) => x / (totalVotes * maxScore))

    const candidateTallies = { scoreFractionAverageByCan }
    const numCans = canGeoms.length
    const votes = { candidateTallies, votesByGeom, parties, numCans }
    return votes
}
