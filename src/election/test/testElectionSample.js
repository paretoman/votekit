import electionOptions1 from './electionOptions1.js'
import sampleElection from '../src/sampleElection/sampleElection.js'
import seedrandom from '../src/lib/snowpack/build/snowpack/pkg/seedrandom.js'
import testSamplingGeometry1 from './testSamplingGeometry1.js'

export default function testElectionSample() {
    const { samplingSeed } = testSamplingGeometry1
    const numSamples = 2
    const rng = seedrandom(samplingSeed)
    const { samplingPointsList } = sampleElection(testSamplingGeometry1, electionOptions1, numSamples, rng)

    return samplingPointsList[0]
}
