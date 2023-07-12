import electionSequence from '../src/sequence/electionSequence.js'
import { last } from '../src/util/jsHelpers.js'
import electionOptions1 from './electionOptions1.js'
import testGeometry1 from './testGeometry1.js'

export default function testElection() {
    const sequenceResults = electionSequence(testGeometry1, electionOptions1)
    const { phaseNames } = sequenceResults
    return sequenceResults[last(phaseNames)].socialChoiceResults.iWinner
}
