/** @module */

import { eq, assert, tests } from '../../src/lib/tinytest.js'
import { testEquidistantLine } from '../../src/sim/voteCasters/CastPluralitySummer2DQuadrature.js'

/**
 * Collects tests from test functions.
 * Runs tests.
 * The test assertion functions are passed to the tests for modularity.
 */
export default function testAll() {
    // Collect.
    const config = {}
    const testObjects = [
        testEquidistantLine(eq, assert),
    ].flat()
    testObjects.forEach((o) => {
        const { label, test } = o
        config[label] = test
    })

    // Run.
    tests(config)
}
