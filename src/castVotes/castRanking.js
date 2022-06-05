/** @module */

import CastRankingAreaSummer from './CastRankingAreaSummer.js'
import CastRankingLineSummer from './CastRankingLineSummer.js'

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
export default function castRanking(canGeoms, voterGeoms, dimensions) {
    const summer = (dimensions === 1)
        ? new CastRankingLineSummer(canGeoms)
        : new CastRankingAreaSummer(canGeoms)

    // get fraction of votes for each candidate so we can summarize results
    const n = canGeoms.length
    let tally = (new Array(n)).fill(0)
    voterGeoms.forEach((voterGeom) => {
        const area = summer.sumArea(voterGeom)
        const weight = ((voterGeom.weight === undefined) ? 1 : voterGeom.weight)
        tally = tally.map((value, index) => value + area[index] * weight)
    })
    const total = tally.reduce((p, c) => p + c)
    const tallyFractions = tally.map((x) => x / total)
    const votes = { tallyFractions }
    return votes
}
