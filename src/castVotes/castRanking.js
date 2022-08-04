/** @module */

import CastRankingSummer2DPolygons from './CastRankingSummer2DPolygons.js'
import CastRankingSummer1DIntervals from './CastRankingSummer1DIntervals.js'

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
export default function castRanking({ canGeoms, voterGeoms, dimensions }) {
    const summer = (dimensions === 1)
        ? new CastRankingSummer1DIntervals(canGeoms)
        : new CastRankingSummer2DPolygons(canGeoms)

    const n = canGeoms.length

    // get fraction of votes for each candidate so we can summarize results
    let areaAll = []
    let rankingAll = []
    let cansRankedAll = []
    const firstPreferences = Array(n).fill(0)
    let totalAreaAll = 0
    const cellData = []

    // should ideally make a set of polygons for each ranking so that we avoid repeating rankings.
    voterGeoms.forEach((voterGeom) => {
        const weight = ((voterGeom.weight === undefined) ? 1 : voterGeom.weight)

        const {
            ranking, cansRanked, area, totalArea, cellDatum,
        } = summer.sumArea(voterGeom, weight)

        areaAll = areaAll.concat(area)
        rankingAll = rankingAll.concat(ranking)
        cansRankedAll = cansRankedAll.concat(cansRanked)
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
    const rankingTallyFractions = areaAll.map((x) => x / totalAreaAll)
    const tallyFractions = firstPreferences.map((x) => x / totalAreaAll)

    const votes = {
        ranking: rankingAll, cansRankedAll, rankingTallyFractions, tallyFractions, cellData,
    }
    return votes
}
