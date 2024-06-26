import electionSequence from '../electionSequence.js'
import optionsBag1 from './optionsBag1.js'
import testGeometry1 from './testGeometry1.js'

export default function testElection() {
    const sequenceResults = electionSequence(testGeometry1, optionsBag1)
    return sequenceResults.socialChoiceResults.iWinner
}
