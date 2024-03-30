import seedrandom from 'seedrandom'
import { optionsBag1 } from '@paretoman/votekit-election-sequence'
import sampleElection from '../sampleElection.js'
import testSamplingGeometry1 from './testSamplingGeometry1.js'

export default function testElectionSample() {
    const { samplingSeed } = testSamplingGeometry1
    const numSamples = 2
    const rng = seedrandom(samplingSeed)
    const { samplingPointsList } = sampleElection(testSamplingGeometry1, optionsBag1, numSamples, rng)

    return samplingPointsList[0]
}
