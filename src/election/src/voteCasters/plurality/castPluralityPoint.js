/** @module */

import * as typesVote from '../types/typesVote.js'
import strategicPlurality from './strategicPlurality.js'
/**
 * Vote for the closest candidate.
 * @returns {typesVote.pluralityVote}
 */
export default function castPluralityPoint(canPoints, voterPoint, dimensions, verbosity, information, voterStrategy, strategyRngs) {
    const d2f = (dimensions === 1) ? d2f1 : d2f2
    const n = canPoints.length
    const dist2 = Array(n)
    for (let i = 0; i < n; i++) {
        dist2[i] = d2f(canPoints[i], voterPoint)
    }

    const i = strategicPlurality(dist2, information, voterStrategy, strategyRngs)

    if (verbosity < 2) {
        return { pluralityVote: i }
    }

    const pluralityAllocation = (new Array(n)).fill(0)
    pluralityAllocation[i] = 1
    const vote = { pluralityAllocation, pluralityVote: i }
    return vote
}
function d2f1(a, b) {
    return (a - b) ** 2
}
function d2f2(a, b) {
    return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2
}
