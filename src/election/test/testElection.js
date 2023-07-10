import electionSequence from '../src/sequence/electionSequence.js'
import electionOptions1 from './electionOptions1.js'
import testGeometry1 from './testGeometry1.js'

export default function testElection() {
    const sequenceResults = electionSequence(testGeometry1, electionOptions1)

    return sequenceResults.socialChoiceResults.iWinner
}
