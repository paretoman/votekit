import election from '../src/election/election.js'
import electionOptions3ClosedPrimary from './electionOptions3ClosedPrimary.js'
import testGeometry2Parties from './testGeometry2Parties.js'

export default function testElectionClosedPrimary() {
    const electionResults = election(testGeometry2Parties, electionOptions3ClosedPrimary)

    return electionResults.socialChoiceResults.allocation
}
