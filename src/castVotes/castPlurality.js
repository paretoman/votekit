/** @module */

import CastPluralitySummer2DQuadrature from './CastPluralitySummer2DQuadrature.js'
import CastPluralitySummer1DIntervals from './CastPluralitySummer1DIntervals.js'

/**
 * Vote for one.
 * Voters cast votes for candidates.
 * There is also a separate graphical representation in Voronoi2D.js.
 * @param {Objects[]} canGeoms - For 2D, an array of objects: {x,y}.
 * For 1D, an array of objects: {x}.
 * @param {Objects[]} voterGeoms - For 2D, an array of objects: {x,y,w}.
 * For 1D, an array of objects: {x,w,densityProfile}.
 * @returns votes, an object
 */
export default function castPlurality({ canGeoms, voterGeoms, dimensions }) {
    const summer = (dimensions === 1)
        ? new CastPluralitySummer1DIntervals(canGeoms)
        : new CastPluralitySummer2DQuadrature(canGeoms)

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
