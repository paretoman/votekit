/** @module */

import seedrandom from 'seedrandom'
import castScoreGrid from './castScoreGrid.js'

// The main difference between this and plurality is we need to return a grid from here.
// We also will return a set of votes from that grid.

/**
 * Voters cast votes for candidates.
 * @param {object} geometry - geometry for casting votes
 * @param {object[]} geometry.canPoints - For 2D, an array of arrays: [x,y].
 * For 1D, an array of numbers: x.
 * @param {object[]} geometry.voterGeoms - For 2D, an array of objects: {x,y,w}.
 * For 1D, an array of objects: {x,w,densityProfile}.
 * @param {object} geometry.parties
 * @param {object} geometry.strategySeed
 * @param {object} geometry.voterStrategyList
 * @param {object} castOptions - options for how to cast votes.
 * @returns {object} votes
 */
export default function castScore(geometry, castOptions) {
    const { canPoints, voterGeoms, parties, strategySeed, voterStrategyList } = geometry
    const { verbosity } = castOptions

    // get fraction of votes for each candidate so we can summarize results
    const n = canPoints.length
    const votesByGeom = []
    const scoreSumByCan = (new Array(n)).fill(0)
    let totalVotes = 0
    const strategyRngs = [seedrandom(`green${strategySeed}`), seedrandom(`orange${strategySeed}`)]
    for (let i = 0; i < voterGeoms.length; i++) {
        const voterGeom = voterGeoms[i]
        const voterStrategy = voterStrategyList[i]

        const votesForGeom = castScoreGrid(voterGeom, geometry, castOptions, strategyRngs, voterStrategy)
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
    const numCans = canPoints.length
    const votes = { candidateTallies, parties, numCans }
    if (verbosity < 2) return votes

    votes.votesByGeom = votesByGeom
    return votes
}
