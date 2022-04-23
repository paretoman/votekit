/** @module */

import CastScoreAreaSummer from './CastScoreAreaSummer.js'
import CastScoreLineSummer from './CastScoreLineSummer.js'
import castScoreTestVote from './castScoreTestVote.js'

// The main difference between this and plurality is we need to return a grid from here.
// We also will return a set of votes from that grid.

/**
 * Vote for one.
 * Voters cast votes for candidates.
 * There is also a separate graphical representation in VoronoiGroup.js.
 * @param {Objects[]} candidates - For 2D, an array of objects: {x,y}.
 * For 1D, an array of objects: {x}.
 * @param {Objects[]} voterShapes - For 2D, an array of objects: {x,y,w}.
 * For 1D, an array of objects: {x,w,densityProfile}.
 * @returns votes, an object
 */
export default function castScore(candidates, voterShapes, dimensions, isTestVoter) {
    if (isTestVoter) {
        const testVoter = voterShapes[0]
        const tallyFractions = castScoreTestVote(candidates, testVoter, dimensions)
        const votes = { tallyFractions }
        return votes
    }

    const summer = (dimensions === 1)
        ? new CastScoreLineSummer(candidates)
        : new CastScoreAreaSummer(candidates)

    // get fraction of votes for each candidate so we can summarize results
    const n = candidates.length
    let tally = (new Array(n)).fill(0)
    let total = 0
    const gridData = []
    for (let i = 0; i < voterShapes.length; i++) {
        const voterShape = voterShapes[i]
        const {
            grid, voteSet, area, totalArea,
        } = summer.sumArea(voterShape)

        const gridDataEntry = { grid, voteSet, voterShape }
        gridData.push(gridDataEntry)

        const weight = ((voterShape.weight === undefined) ? 1 : voterShape.weight)
        tally = tally.map((value, index) => value + area[index] * weight)
        total += totalArea
    }
    const tallyFractions = tally.map((x) => x / total)
    const votes = {
        tallyFractions, gridData,
    }
    return votes
}
