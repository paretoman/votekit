import assert from 'assert'
import { describe, it } from 'mocha'
import testElection from './testElection.js'
import testElectionSample from './testElectionSample.js'

describe('The election', () => {
    it('should elect the second candidate', () => {
        const iWinner = testElection()
        assert.equal(1, iWinner)
    })
})
describe('Sampling an election', () => {
    it('should sample a winner', () => {
        const point0 = testElectionSample()
        const expectedPoint0 = [1, 2]
        assert.equal(expectedPoint0.length, point0.length)
    })
})
