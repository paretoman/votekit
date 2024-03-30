import assert from 'assert'
import { describe, it } from 'mocha'
import testElection from './test/testElection.js'
import testElectionClosedPrimary from './test/testElectionClosedPrimary.js'
import testElectionNonpartisanOpenPrimary from './test/testElectionNonpartisanOpenPrimary.js'

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
describe('An election with a nonpartisan open primary', () => {
    it('should elect the second candidate', () => {
        const allocation = testElectionNonpartisanOpenPrimary()
        assert.equal(1, allocation[1])
    })
})
