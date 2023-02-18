/** @module */

import { minIndex } from '../../election/mathHelpers.js'
import * as typesVote from '../types/typesVote.js'
/**
 * Vote for the closest candidate.
 * @returns {typesVote.pluralityVote}
 */
export default function castPluralityTestVote({ canGeoms, voterPoint, dimensions }) {
    const df = (dimensions === 1) ? df1 : df2
    const dist2 = canGeoms.map((c) => df(c, voterPoint))
    const i = minIndex(dist2)
    const n = canGeoms.length
    const pluralityAllocation = (new Array(n)).fill(0)
    pluralityAllocation[i] = 1
    const vote = { pluralityAllocation, pluralityVote: i }
    return vote
}
function df1(a, b) {
    return (a.x - b.x) ** 2
}
function df2(a, b) {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2
}
