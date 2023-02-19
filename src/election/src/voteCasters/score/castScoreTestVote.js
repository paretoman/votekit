/** @module */

import { minMax } from '../../election/mathHelpers.js'

/**
 * Vote for the closest candidate.
 */
export default function castScoreTestVote({ canPoints, voterPoint, dimensions }) {
    const lc = canPoints.length
    const scoreVote = (new Array(lc)).fill(0)
    const df = (dimensions === 1) ? df1 : df2

    // in the current implementation, all candidates are frontrunners
    const dist = canPoints.map((c) => df(c, voterPoint))
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
    return (a - b) ** 2
}
function df2(a, b) {
    return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2
}
