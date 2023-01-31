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
export default function castScoreLong({ canGeoms, voterGeoms, dimensions, parties }, castOptions) {
    const summer = new CastScoreSummerGrid(canGeoms, castOptions, dimensions)

    // get fraction of votes for each candidate so we can summarize results
    const n = canGeoms.length

    // find totalWeight of "voter area" over all the voterGeoms
    // then find normalization factor, which is just 1/totalWeight
    let totalCount = 0
    const sums = []
    for (let i = 0; i < voterGeoms.length; i++) {
        const voterGeom = voterGeoms[i]
        sums[i] = summer.sumArea(voterGeom)
        const { totalCountForGeom } = sums[i]

        let { tractInDistrict } = voterGeom
        if (tractInDistrict === undefined) tractInDistrict = 1
        totalCount += totalCountForGeom * tractInDistrict
    }
    const invTotalCount = 1 / totalCount

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
            grid, voteSet, countByCanForGeom,
        } = sums[i]

        // use voteIndex to find flattened index
        // voteIndex = Number[] with first index as geometry and second index as grid index
        const voteIndex = []

        for (let j = 0; j < voteSet.length; j++) {
            scoreVotes[k] = voteSet[j].tallyFractions
            voteIndex[j] = k
            votePop[k] = grid.count[j] * invTotalCount
            k += 1
        }

        const gridDataEntry = {
            grid, voteSet, voterGeom, voteIndex,
        }
        gridData[i] = gridDataEntry

        let { tractInDistrict } = voterGeom
        if (tractInDistrict === undefined) tractInDistrict = 1
        tallyFractions = tallyFractions.map((f, index) => f + countByCanForGeom[index] * tractInDistrict * invTotalCount)
    }
    const votes = {
        tallyFractions, gridData, scoreVotes, votePop, parties,
    }
    return votes
}
