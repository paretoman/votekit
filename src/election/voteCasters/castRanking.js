/** @module */

import CastRankingSummer2DPolygons from './CastRankingSummer2DPolygons.js'
import CastRankingSummer1DIntervals from './CastRankingSummer1DIntervals.js'
import CastRankingSummerGrid from './CastRankingSummerGrid.js'

/**
 * Vote for one.
 * Voters cast votes for candidates.
 * There is also a separate graphical representation in VoronoiRanking2D.js.
 * @param {Objects[]} canGeoms - For 2D, an array of objects: {x,y}.
 * For 1D, an array of objects: {x}.
 * @param {Objects[]} voterGeoms - For 2D, an array of objects: {x,y,w}.
 * For 1D, an array of objects: {x,w,densityProfile}.
 * @returns votes, an object
 */
export default function castRanking({ canGeoms, voterGeoms, dimensions, parties }, castOptions) {
    const SummerLines = (dimensions === 1)
        ? CastRankingSummer1DIntervals
        : CastRankingSummer2DPolygons
    const someGaussian2D = voterGeoms.some((v) => v.densityProfile === 'gaussian') && dimensions === 2
    const Summer = (someGaussian2D) ? CastRankingSummerGrid : SummerLines
    const summer = new Summer(canGeoms, castOptions, dimensions)

    const n = canGeoms.length

    // get fraction of votes for each candidate so we can summarize results
    let areaAll = []
    let rankingVotes = []
    let cansByRank = []
    const firstPreferences = Array(n).fill(0)
    let totalAreaAll = 0
    const cellData = []
    const votesByGeom = []

    // should ideally make a set of polygons for each ranking so that we avoid repeating rankings.
    voterGeoms.forEach((voterGeom, g) => {
        const weight = ((voterGeom.weight === undefined) ? 1 : voterGeom.weight)

        const votesForGeom = summer.sumArea(voterGeom, weight)
        votesByGeom[g] = votesForGeom
        const { rankings, cansRanked, area, totalArea, cellDatum } = votesForGeom

        areaAll = areaAll.concat(area)
        rankingVotes = rankingVotes.concat(rankings)
        cansByRank = cansByRank.concat(cansRanked)
        totalAreaAll += totalArea
        cellData.push(cellDatum)

        for (let i = 0; i < cansRanked.length; i++) { // tally first preferences
            const cr0 = cansRanked[i][0]
            for (let k = 0; k < cr0.length; k++) {
                const c0 = cr0[k]
                firstPreferences[c0] += area[i]
            }
        }
    })
    const votePop = areaAll.map((x) => x / totalAreaAll)
    const tallyFractions = firstPreferences.map((x) => x / totalAreaAll)

    const votes = {
        rankingVotes, cansByRank, votePop, tallyFractions, cellData, parties, votesByGeom,
    }
    return votes
}
