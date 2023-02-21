/** @module */

import { minIndex } from '../../election/mathHelpers.js'
import * as typesVote from '../types/typesVote.js'
/**
 * Vote for the closest candidate.
 * @returns {typesVote.pluralityVote}
 */
export default function castPluralityPoint(canPoints, voterPoint, dimensions, verbosity) {
    const d2f = (dimensions === 1) ? d2f1 : d2f2
    const n = canPoints.length
    const dist2 = Array(n)
    for (let i = 0; i < n; i++) {
        dist2[i] = d2f(canPoints[i], voterPoint)
    }
    const i = minIndex(dist2)

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
