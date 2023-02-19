import makeGeography from '../src/geography/makeGeography.js'
import electionOptions1 from './electionOptions1.js'
import makeCandidateDistributionCDF from '../src/sampleElection/makeCandidateDistributionCDF.js'
import sampleElection from '../src/sampleElection/sampleElection.js'
import seedrandom from '../src/lib/snowpack/build/snowpack/pkg/seedrandom.js'

export default function testElectionSample() {
    const dimensions = 2

    const voterGeoms = [
        { x: 0, y: 0, w: 200, densityProfile: 'step' },
    ]

    const canDnGeoms = [
        { x: 0, y: 0, w: 200, densityProfile: 'step' },
    ]

    const parties = {
        partiesByCan: [0, 1],
        numParties: 2,
    }

    const electionOptions = electionOptions1

    const geography = makeGeography(electionOptions, voterGeoms, dimensions)

    const canDnCDF = makeCandidateDistributionCDF(canDnGeoms, dimensions)

    const samplingGeometry = { voterGeoms, canDnGeoms, parties, dimensions, geography, canDnCDF }

    const numSamples = 2
    const seed = '670171517'
    const rng = seedrandom(seed)
    const { samplingPointsList } = sampleElection(samplingGeometry, electionOptions, numSamples, rng)

    return samplingPointsList[0]
}
