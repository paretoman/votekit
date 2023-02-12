import assert from 'assert'
import { describe, it } from 'mocha'
import testElection from './testElection.js'

describe('The election', () => {
    it('should elect the second candidate', () => {
        const iWinner = testElection()
        assert.equal(1, iWinner)
    })
})
