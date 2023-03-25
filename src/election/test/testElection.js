import election from '../src/election/election.js'
import electionOptions1 from './electionOptions1.js'
import testGeometry1 from './testGeometry1.js'

export default function testElection() {
    const electionResults = election(testGeometry1, electionOptions1)

    return electionResults.socialChoiceResults.iWinner
}
