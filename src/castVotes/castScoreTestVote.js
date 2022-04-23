import { minMax } from '../utilities/jsHelpers.js'

/**
 * Vote for the closest candidate.
 * @param {Objects[]} candidates - For 2D, an array of objects: {x,y}.
 * For 1D, an array of objects: {x}.
 * @param {*} voter
 * @param {*} dimensions
 */
export default function castScoreTestVote(candidates, voter, dimensions) {
    const lc = candidates.length
    const tally = (new Array(lc)).fill(0)
    const df = (dimensions === 1) ? df1 : df2

    // in the current implementation, all candidates are frontrunners
    const dist = candidates.map((c) => df(c, voter))
    const [min, max] = minMax(dist)
    const maxscore = 1
    const minscore = 0
    for (let i = 0; i < lc; i++) {
        const d = dist[i]
        if (d <= min) {
            tally[i] = maxscore
        } else if (d >= max) {
            // in the case that the voter likes the frontrunner candidates equally,
            // he just votes for everyone better
            tally[i] = minscore
        } else { // putting this last avoids max==min giving division by 0
            const frac = (d - min) / (max - min)
            // tally[i] = Math.floor(0.5 + minscore + (maxscore - minscore) * (1 - frac))
            tally[i] = minscore + (maxscore - minscore) * (1 - frac)
        }
    }
    return tally
}
function df1(a, b) {
    return Math.abs(a.x - b.x)
}
function df2(a, b) {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2
}
