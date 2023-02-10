/** @module */

import castScoreGrid from '../score/castScoreGrid.js'

// The main difference between this and plurality is we need to return a grid from here.
// We also will return a set of votes from that grid.

/**
 * Vote for one.
 * Voters cast votes for candidates.
 * There is also a separate graphical representation in VoronoiGroup.js.
 * @param {Objects[]} canGeoms - For 2D, an array of objects: {x,y}.
 * For 1D, an array of objects: {x}.
 * @param {Objects[]} voterGeoms - For 2D, an array of objects: {x,y,w}.
 * For 1D, an array of objects: {x,w,densityProfile}.
 * @returns votes, an object
 */
export default function castScoreFull(geometry, castOptions) {
    const { canGeoms, voterGeoms, parties } = geometry

    // get fraction of votes for each candidate so we can summarize results
    const n = canGeoms.length

    // find totalWeight of "voter area" over all the voterGeoms
    // then find normalization factor, which is just 1/totalWeight
    let totalVotes = 0
    const votesByGeom = []
    for (let i = 0; i < voterGeoms.length; i++) {
        const voterGeom = voterGeoms[i]

        const votesForGeom = castScoreGrid(voterGeom, geometry, castOptions)
        votesByGeom[i] = votesForGeom
        const { totalVotes: totalVotesForGeom } = votesForGeom

        totalVotes += totalVotesForGeom
    }
    const invTotalCount = 1 / totalVotes

    // tally votes
    // flatten voteSets into scoreVotes
    // voteFractions is number of voters with that vote as a fraction of total votes (usually 1 or lower)
    const scoreSumByCan = (new Array(n)).fill(0)
    const scoreVotes = []
    const voteFractions = []
    let index = 0
    for (let i = 0; i < voterGeoms.length; i++) {
        const {
            grid, voteSet,
            scoreSumByCan: scoreSumByCanForGeom,
        } = votesByGeom[i]

        // use voteIndex to find flattened index
        // voteIndex = Number[] with first index as geometry and second index as grid index
        const voteIndex = []

        for (let j = 0; j < voteSet.length; j++) {
            scoreVotes[index] = voteSet[j].scoreVote
            voteIndex[j] = index
            voteFractions[index] = grid.voteCounts[j] * invTotalCount
            index += 1
        }
        votesByGeom[i].voteIndex = voteIndex

        for (let k = 0; k < n; k++) {
            scoreSumByCan[k] += scoreSumByCanForGeom[k]
        }
    }
    const maxScore = 1
    const scoreFractionAverageByCan = scoreSumByCan.map((x) => x / (totalVotes * maxScore))

    const preferenceLists = { scoreVotes }
    const preferenceTallies = { voteFractions }
    const candidateTallies = { scoreFractionAverageByCan }
    const votes = { preferenceLists, preferenceTallies, candidateTallies, votesByGeom, parties }
    return votes
}
