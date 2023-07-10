import electionSequence from '../src/sequence/electionSequence.js'
import electionOptions2NonpartisanOpenPrimary from './electionOptions2NonpartisanOpenPrimary.js'
import testGeometry1 from './testGeometry1.js'

export default function testElectionNonpartisanOpenPrimary() {
    const electionResults = electionSequence(testGeometry1, electionOptions2NonpartisanOpenPrimary)

    return electionResults.socialChoiceResults.allocation
}
