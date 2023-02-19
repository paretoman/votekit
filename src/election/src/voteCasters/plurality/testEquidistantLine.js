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
            const m = equidistantLine({ x: 0, y: 0 }, { x: 1, y: 1 })
            const e = { A: { x: 1, y: 1 }, b: 1 }
            eq(e.A.x / e.b, m.A.x / m.b)
            eq(e.A.y / e.b, m.A.y / m.b)
        },
    }, {
        label: 'The first point satisfies Ac < b. A[0,0] < b. ',
        test: () => {
            const m = equidistantLine({ x: 0, y: 0 }, { x: 1, y: 1 })
            assert(m.b > 0)
        },
    },
    ]
}
