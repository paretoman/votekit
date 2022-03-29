/** @module */

import AreaSummer from './AreaSummer.js'

/**
 * Vote for one.
 * Voters cast votes for candidates.
 * There is also a separate graphical representation in VoronoiGroup.js.
 * @param {*} candidates - an array of objects with x and y attributes.
 * @param {*} voterGroups - an array of objects with x,y, and w attributes.
 * @returns votes, an object
 */
export default function pluralityBallot(candidates, voterGroups) {
    const summer = new AreaSummer(candidates)

    // get fraction of votes for each candidate so we can summarize results
    const n = candidates.length
    let tally = (new Array(n)).fill(0)
    voterGroups.forEach((voterGroup) => {
        const area = summer.sumArea(voterGroup)
        tally = tally.map((value, index) => value + area[index])
    })
    const total = tally.reduce((p, c) => p + c)
    const tallyFractions = tally.map((x) => x / total)
    const votes = { tallyFractions }
    return votes
}
