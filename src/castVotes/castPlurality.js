/** @module */

import CastPluralityAreaSummer from './CastPluralityAreaSummer.js'
import CastPluralityLineSummer from './CastPluralityLineSummer.js'
import castPluralityTestVote from './castPluralityTestVote.js'

/**
 * Vote for one.
 * Voters cast votes for candidates.
 * There is also a separate graphical representation in Voronoi2D.js.
 * @param {Objects[]} candidates - For 2D, an array of objects: {x,y}.
 * For 1D, an array of objects: {x}.
 * @param {Objects[]} voterGeoms - For 2D, an array of objects: {x,y,w}.
 * For 1D, an array of objects: {x,w,densityProfile}.
 * @returns votes, an object
 */
export default function castPlurality(candidates, voterGeoms, dimensions, optionCast, isTestVoter) {
    if (isTestVoter) {
        const tallyFractions = castPluralityTestVote(candidates, voterGeoms[0], dimensions)
        const votes = { tallyFractions }
        return votes
    }

    const summer = (dimensions === 1)
        ? new CastPluralityLineSummer(candidates)
        : new CastPluralityAreaSummer(candidates)

    // get fraction of votes for each candidate so we can summarize results
    const n = candidates.length
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
