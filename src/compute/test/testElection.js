import { last } from '@paretoman/votekit-utilities'
import electionSequence from '@paretoman/votekit-election-sequence'
import optionsBag1 from './optionsBag1.js'
import testGeometry1 from './testGeometry1.js'

export default function testElection() {
    const sequenceResults = electionSequence(testGeometry1, optionsBag1)
    const { phaseNames } = sequenceResults
    return sequenceResults[last(phaseNames)].socialChoiceResults.iWinner
}
