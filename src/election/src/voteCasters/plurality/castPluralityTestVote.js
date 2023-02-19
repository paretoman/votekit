/** @module */

import { minIndex } from '../../election/mathHelpers.js'
import * as typesVote from '../types/typesVote.js'
/**
 * Vote for the closest candidate.
 * @returns {typesVote.pluralityVote}
 */
export default function castPluralityTestVote(canPoints, voterPoint, dimensions) {
    const d2f = (dimensions === 1) ? d2f1 : d2f2
    const dist2 = canPoints.map((c) => d2f(c, voterPoint))
    const i = minIndex(dist2)
    const n = canPoints.length
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
