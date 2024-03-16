import { last } from '@paretoman/votekit-utilities'
import electionSequence from '@paretoman/votekit-election-sequence'
import electionOptions2NonpartisanOpenPrimary from './electionOptions2NonpartisanOpenPrimary.js'
import testGeometry1 from './testGeometry1.js'

export default function testElectionNonpartisanOpenPrimary() {
    const sequenceResults = electionSequence(testGeometry1, electionOptions2NonpartisanOpenPrimary)

    const { phaseNames } = sequenceResults
    return sequenceResults.phases[last(phaseNames)].socialChoiceResults.allocation
}
