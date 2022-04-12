import { minIndex } from '../utilities/jsHelpers.js'

/**
 * Vote for the closest candidate.
 * @param {Objects[]} candidates - For 2D, an array of objects: {x,y}.
 * For 1D, an array of objects: {x}.
 * @param {*} voter
 * @param {*} dimensions
 */
export default function pluralityTestVote(candidates, voter, dimensions) {
    const df = (dimensions === 1) ? df1 : df2
    const dist2 = candidates.map((c) => df(c, voter))
    const i = minIndex(dist2)
    const n = candidates.length
    const tally = (new Array(n)).fill(0)
    tally[i] = 1
    return tally
}
function df1(a, b) {
    return (a.x - b.x) ** 2
}
function df2(a, b) {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2
}
