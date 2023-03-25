import assert from 'assert'
import { describe, it } from 'mocha'
import testElection from './testElection.js'
import testElectionClosedPrimary from './testElectionClosedPrimary.js'
import testElectionSample from './testElectionSample.js'

describe('The election', () => {
    it('should elect the second candidate', () => {
        const iWinner = testElection()
        assert.equal(1, iWinner)
    })
})
describe('An election with a closed primary', () => {
    it('should elect the second candidate', () => {
        const allocation = testElectionClosedPrimary()
        assert.equal(1, allocation[1])
    })
})
describe('Sampling an election', () => {
    it('should sample the same winner each time', () => {
        const point0 = testElectionSample()
        const expectedPoint0 = [-49.78348432747873, 4.589134481725754]
        assert.deepEqual(expectedPoint0, point0)
    })
})
