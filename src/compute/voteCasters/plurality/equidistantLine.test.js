import { describe, test } from 'mocha'
import * as assert from 'node:assert'

import equidistantLine from './equidistantLine.js'

/**
 * Test for the function equidistantLine, which finds a line equidistant from two points.
 * @param {Function} eq - assertion function for equality
 * @param {Function} assert - assertion function for true
 * @returns {object[]} an array of test objects, each with a label and a test function.
 */

describe('equidistanLine()', () => {
    test('Finds line equation equidistant from two points.', () => {
        const m = equidistantLine([0, 0], [1, 1])
        const e = [1, 1, -1]
        const [max, may, mb] = m
        const [eax, eay, eb] = e
        assert.strictEqual(eax / eb, max / mb)
        assert.strictEqual(eay / eb, may / mb)
    })

    test('The first point satisfies ax * x + ay * y + b < 0. [0,0] + b < 0.', () => {
        const m = equidistantLine([0, 0], [1, 1])
        const [, , mb] = m
        assert.ok(mb < 0)
    })
})
