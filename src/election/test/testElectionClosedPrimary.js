import electionSequence from '../src/sequence/electionSequence.js'
import { last } from '../src/utilities/jsHelpers.js'
import electionOptions3ClosedPrimary from './electionOptions3ClosedPrimary.js'
import testGeometry2Parties from './testGeometry2Parties.js'

export default function testElectionClosedPrimary() {
    const sequenceResults = electionSequence(testGeometry2Parties, electionOptions3ClosedPrimary)

    const { phaseNames } = sequenceResults
    return sequenceResults[last(phaseNames)].socialChoiceResults.allocation
}
