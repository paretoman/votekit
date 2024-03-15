import { last } from '@paretoman/votekit-utilities'
import electionSequence from '../src/electionSequence/electionSequence.js'
import electionOptions3ClosedPrimary from './electionOptions3ClosedPrimary.js'
import testGeometry2Parties from './testGeometry2Parties.js'

export default function testElectionClosedPrimary() {
    const sequenceResults = electionSequence(testGeometry2Parties, electionOptions3ClosedPrimary)

    const { phaseNames } = sequenceResults
    return sequenceResults[last(phaseNames)].socialChoiceResults.allocation
}
