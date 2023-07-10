import electionSequence from '../src/sequence/electionSequence.js'
import electionOptions3ClosedPrimary from './electionOptions3ClosedPrimary.js'
import testGeometry2Parties from './testGeometry2Parties.js'

export default function testElectionClosedPrimary() {
    const sequenceResults = electionSequence(testGeometry2Parties, electionOptions3ClosedPrimary)

    return sequenceResults.socialChoiceResults.allocation
}
