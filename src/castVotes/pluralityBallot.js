/** @module */

import AreaSummer from './AreaSummer.js'
import LineSummer from './LineSummer.js'

/**
 * Vote for one.
 * Voters cast votes for candidates.
 * There is also a separate graphical representation in VoronoiGroup.js.
 * @param {*} candidates - an array of objects each with a p2 or p1 property.
 * Or a list of positions for the 1D case.
 * @param {*} voterGroups - an array of objects with {p2 or p1} and r attributes.
 * @returns votes, an object
 */
export default function pluralityBallot(candidates, voterGroups, dimensions) {
    const summer = (dimensions === 1) ? new LineSummer(candidates) : new AreaSummer(candidates)

    // get fraction of votes for each candidate so we can summarize results
    const n = candidates.length
    let tally = (new Array(n)).fill(0)
    voterGroups.forEach((voterGroup) => {
        const area = summer.sumArea(voterGroup)
        const weight = ((voterGroup.weight === undefined) ? 1 : voterGroup.weight)
        tally = tally.map((value, index) => value + area[index] * weight)
    })
    const total = tally.reduce((p, c) => p + c)
    const tallyFractions = tally.map((x) => x / total)
    const votes = { tallyFractions }
    return votes
}
