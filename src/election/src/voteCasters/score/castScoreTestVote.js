/** @module */

import { minMax } from '../../election/mathHelpers.js'

/**
 * Vote for the closest candidate.
 * @param {Objects[]} canGeoms - For 2D, an array of objects: {x,y}.
 * For 1D, an array of objects: {x}.
 * @param {*} voter
 * @param {*} dimensions
 */
export default function castScoreTestVote({ canGeoms, voterGeom, dimensions }) {
    const lc = canGeoms.length
    const scoreVote = (new Array(lc)).fill(0)
    const df = (dimensions === 1) ? df1 : df2

    // in the current implementation, all candidates are frontrunners
    const dist = canGeoms.map((c) => df(c, voterGeom))
    const [min, max] = minMax(dist)
    const maxscore = 1
    const minscore = 0
    for (let i = 0; i < lc; i++) {
        const d = dist[i]
        if (d <= min) {
            scoreVote[i] = maxscore
        } else if (d >= max) {
            // in the case that the voter likes the frontrunner candidates equally,
            // he just votes for everyone better
            scoreVote[i] = minscore
        } else { // putting this last avoids max==min giving division by 0
            const frac = (d - min) / (max - min)
            // scoreVote[i] = Math.floor(0.5 + minscore + (maxscore - minscore) * (1 - frac))
            scoreVote[i] = minscore + (maxscore - minscore) * (1 - frac)
        }
    }
    const vote = { scoreVote }
    return vote
}
function df1(a, b) {
    return Math.abs(a.x - b.x)
}
function df2(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}
