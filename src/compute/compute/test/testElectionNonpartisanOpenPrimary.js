import electionSequence from '@paretoman/votekit-election-sequence'
import electionOptions2NonpartisanOpenPrimary from './electionOptions2NonpartisanOpenPrimary.js'
import testGeometry1 from './testGeometry1.js'

export default function testElectionNonpartisanOpenPrimary() {
    const sequenceResults = electionSequence(testGeometry1, electionOptions2NonpartisanOpenPrimary)

    return sequenceResults.socialChoiceResults.allocation
}
