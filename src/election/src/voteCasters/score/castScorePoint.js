/** @module */

import { minMax, randomIndexFromCDF } from '../../election/mathHelpers.js'

/**
 * Vote for the closest candidate.
 */
export default function castScorePoint(canPoints, voterPoint, dimensions, verbosity, information, voterStrategy, strategyRng) {
    const df = (dimensions === 1) ? df1 : df2

    const n = canPoints.length
    const dist = Array(n)
    for (let i = 0; i < n; i++) {
        dist[i] = df(canPoints[i], voterPoint)
    }

    if (voterStrategy !== undefined) {
        const { actionCDF, actionList } = voterStrategy
        const idx = randomIndexFromCDF(actionCDF, strategyRng)
        const { actionName, actionOptions } = actionList[idx]
    }

    // in the current implementation, all candidates are frontrunners

    const [min, max] = minMax(dist)
    const maxscore = 1
    const minscore = 0
    const scoreVote = (new Array(n)).fill(0)
    for (let i = 0; i < n; i++) {
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
    return Math.abs(a - b)
}
function df2(a, b) {
    return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)
}
