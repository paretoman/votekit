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
export default function castScore(geometry, castOptions) {
    const { canGeoms, voterGeoms, dimensions, parties } = geometry

    const summer = new CastScoreSummerGrid(canGeoms, castOptions, dimensions)

    // get fraction of votes for each candidate so we can summarize results
    const n = canGeoms.length
    let scoreSumByCan = (new Array(n)).fill(0)
    let totalCount = 0
    const votesByGeom = []
    for (let i = 0; i < voterGeoms.length; i++) {
        const voterGeom = voterGeoms[i]

        const votesForGeom = summer.sumArea(voterGeom)
        votesByGeom[i] = votesForGeom
        const { scoreSumByCanForGeom, totalCountForGeom } = votesForGeom

        scoreSumByCan = scoreSumByCan.map(
            (scoreSum, k) => scoreSum + scoreSumByCanForGeom[k],
        )
        totalCount += totalCountForGeom
    }
    const scoreFractionByCan = scoreSumByCan.map((x) => x / totalCount)

    const votes = { tallyFractions: scoreFractionByCan, parties, votesByGeom }
    return votes
}
