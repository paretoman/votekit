import { testEquidistantLine } from './AreaSummer.js'
import { eq, assert, tests } from './lib/tinytest.esm.js'

export default function testAll() {
    // Collects tests from test functions.
    // Runs tests.
    // The test assertion functions are passed to the tests for modularity.

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
