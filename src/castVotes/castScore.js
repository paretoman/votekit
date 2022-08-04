/** @module */

import CastScoreSummer2DGrid from './CastScoreSummer2DGrid.js'
import CastScoreSummer1DGrid from './CastScoreSummer1DGrid.js'

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
export default function castScore({
    canGeoms, voterGeoms, dimensions, optionCast,
}) {
    const summer = (dimensions === 1)
        ? new CastScoreSummer1DGrid(canGeoms)
        : new CastScoreSummer2DGrid(canGeoms, optionCast)

    // get fraction of votes for each candidate so we can summarize results
    const n = canGeoms.length
    let tally = (new Array(n)).fill(0)
    let total = 0
    const gridData = []
    for (let i = 0; i < voterGeoms.length; i++) {
        const voterGeom = voterGeoms[i]
        const {
            grid, voteSet, area, totalArea,
        } = summer.sumArea(voterGeom)

        const gridDataEntry = { grid, voteSet, voterGeom }
        gridData.push(gridDataEntry)

        const weight = ((voterGeom.weight === undefined) ? 1 : voterGeom.weight)
        tally = tally.map((value, index) => value + area[index] * weight)
        total += totalArea
    }
    const tallyFractions = tally.map((x) => x / total)
    const votes = {
        tallyFractions, gridData,
    }
    return votes
}
