/** @module */

import CastScoreSummerGrid from './CastScoreSummerGrid.js'

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
export default function castScoreLong(geometry, castOptions) {
    const { canGeoms, voterGeoms, dimensions, parties } = geometry

    const summer = new CastScoreSummerGrid(canGeoms, castOptions, dimensions)

    // get fraction of votes for each candidate so we can summarize results
    const n = canGeoms.length

    // find totalWeight of "voter area" over all the voterGeoms
    // then find normalization factor, which is just 1/totalWeight
    let totalCount = 0
    const votesByGeom = []
    for (let i = 0; i < voterGeoms.length; i++) {
        const voterGeom = voterGeoms[i]

        const votesForGeom = summer.sumArea(voterGeom)
        votesByGeom[i] = votesForGeom
        const { totalCount: totalCountForGeom } = votesForGeom

        totalCount += totalCountForGeom
    }
    const invTotalCount = 1 / totalCount

    // tally votes
    let scoreAverageByCan = (new Array(n)).fill(0)
    // flatten voteSets into scoreVotes
    // votePop is number of voters with that vote (usually 1 or lower)
    const scoreVotes = []
    const votePop = []
    let k = 0
    for (let i = 0; i < voterGeoms.length; i++) {
        const {
            grid, voteSet,
            scoreSumByCan: scoreSumByCanForGeom,
        } = votesByGeom[i]

        // use voteIndex to find flattened index
        // voteIndex = Number[] with first index as geometry and second index as grid index
        const voteIndex = []

        for (let j = 0; j < voteSet.length; j++) {
            scoreVotes[k] = voteSet[j].tallyFractions
            voteIndex[j] = k
            votePop[k] = grid.countByVote[j] * invTotalCount
            k += 1
        }
        votesByGeom[i].voteIndex = voteIndex

        scoreAverageByCan = scoreAverageByCan.map((f, can) => f + scoreSumByCanForGeom[can] * invTotalCount)
    }
    const votes = { tallyFractions: scoreAverageByCan, votesByGeom, scoreVotes, votePop, parties }
    return votes
}
