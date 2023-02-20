import equidistantLine from './equidistantLine.js'

/**
 * Test for the function equidistantLine, which finds a line equidistant from two points.
 * @param {Function} eq - assertion function for equality
 * @param {Function} assert - assertion function for true
 * @returns {object[]} an array of test objects, each with a label and a test function.
 */
export default function testEquidistantLine(eq, assert) {
    // Takes an assertion function.
    // Returns a test function.

    return [{
        label: 'Finds line equation equidistant from two points.',
        test: () => {
            const m = equidistantLine([0, 0], [1, 1])
            const e = [1, 1, 1]
            const [max, may, mb] = m
            const [eax, eay, eb] = e
            eq(eax / eb, max / mb)
            eq(eay / eb, may / mb)
        },
    }, {
        label: 'The first point satisfies Ac < b. A[0,0] < b. ',
        test: () => {
            const m = equidistantLine([0, 0], [1, 1])
            const [, , mb] = m
            assert(mb > 0)
        },
    },
    ]
}
