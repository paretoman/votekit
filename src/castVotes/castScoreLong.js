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
    canGeoms, voterGeoms, dimensions, castOptions,
}) {
    const summer = (dimensions === 1)
        ? new CastScoreSummer1DGrid(canGeoms)
        : new CastScoreSummer2DGrid(canGeoms, castOptions)

    // get fraction of votes for each candidate so we can summarize results
    const n = canGeoms.length

    // find totalWeight of "voter area" over all the voterGeoms
    // then find normalization factor, which is just 1/totalWeight
    let totalWeight = 0
    const sums = []
    for (let i = 0; i < voterGeoms.length; i++) {
        const voterGeom = voterGeoms[i]
        sums[i] = summer.sumArea(voterGeom)
        const { totalArea } = sums[i]

        const weight = ((voterGeom.weight === undefined) ? 1 : voterGeom.weight)
        totalWeight += totalArea * weight
    }
    const invTotalWeight = 1 / totalWeight

    // tally votes
    let tallyFractions = (new Array(n)).fill(0)
    const gridData = []
    // flatten voteSets into scoreVotes
    // votePop is number of voters with that vote (usually 1 or lower)
    const scoreVotes = []
    const votePop = []
    let k = 0
    for (let i = 0; i < voterGeoms.length; i++) {
        const voterGeom = voterGeoms[i]
        const {
            grid, voteSet, weightSet, area,
        } = sums[i]

        // use voteIndex to find flattened index
        // voteIndex = Number[] with first index as geometry and second index as grid index
        const voteIndex = []

        for (let j = 0; j < voteSet.length; j++) {
            scoreVotes[k] = voteSet[j].tallyFractions
            voteIndex[j] = k
            votePop[k] = weightSet[j] * invTotalWeight
            k += 1
        }

        const gridDataEntry = {
            grid, voteSet, voterGeom, voteIndex,
        }
        gridData[i] = gridDataEntry

        const weight = ((voterGeom.weight === undefined) ? 1 : voterGeom.weight)
        // area is relative to the geom
        // weight is for the geom relative to the whole election
        tallyFractions = tallyFractions.map((f, index) => f + area[index] * weight * invTotalWeight)
    }
    const votes = {
        tallyFractions, gridData, scoreVotes, votePop,
    }
    return votes
}
