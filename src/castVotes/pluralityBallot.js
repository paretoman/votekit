/** @module */

import AreaSummer from './AreaSummer.js'
import LineSummer from './LineSummer.js'
import pluralityTestVote from './pluralityTestVote.js'

/**
 * Vote for one.
 * Voters cast votes for candidates.
 * There is also a separate graphical representation in VoronoiGroup.js.
 * @param {Objects[]} candidates - For 2D, an array of objects: {x,y}.
 * For 1D, an array of objects: {x}.
 * @param {Objects[]} voterGroups - For 2D, an array of objects: {x,y,w}.
 * For 1D, an array of objects: {x,w,densityProfile}.
 * @returns votes, an object
 */
export default function pluralityBallot(candidates, voterGroups, dimensions, isTestVoter) {
    if (isTestVoter) {
        const tallyFractions = pluralityTestVote(candidates, voterGroups[0], dimensions)
        const votes = { tallyFractions }
        return votes
    }

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
