import * as assert from 'node:assert'
import { describe, it } from 'mocha'
import testElectionSample from './test/testElectionSample.js'

describe('Sampling an election', () => {
    it('should sample the same winner each time', () => {
        const point0 = testElectionSample()
        const expectedPoint0 = [-49.78348432747873, 4.589134481725754]
        assert.deepEqual(expectedPoint0, point0)
    })
})
