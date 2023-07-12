import electionSequence from '../src/sequence/electionSequence.js'
import { last } from '../src/util/jsHelpers.js'
import electionOptions2NonpartisanOpenPrimary from './electionOptions2NonpartisanOpenPrimary.js'
import testGeometry1 from './testGeometry1.js'

export default function testElectionNonpartisanOpenPrimary() {
    const sequenceResults = electionSequence(testGeometry1, electionOptions2NonpartisanOpenPrimary)

    const { phaseNames } = sequenceResults
    return sequenceResults[last(phaseNames)].socialChoiceResults.allocation
}
