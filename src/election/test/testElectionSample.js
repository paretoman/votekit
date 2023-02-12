import makeGeography from '../src/geography/makeGeography.js'
import electionOptions1 from './electionOptions1.js'
import CandidateDistributionSampler2D from '../src/sampler/CandidateDistributionSampler2D.js'
import ElectionSampler from '../src/sampler/ElectionSampler.js'

export default function testElectionSample() {
    const dimensions = 2

    const voterGeoms = [
        { x: 0, y: 0, w: 200, densityProfile: 'step' },
    ]

    const canDnsGeoms = [
        { x: 0, y: 0, w: 200, densityProfile: 'step' },
    ]

    const parties = {
        partiesByCan: [[0], [1]],
    }

    const electionOptions = electionOptions1

    const geography = makeGeography(electionOptions, voterGeoms, dimensions)
    const geometry = { voterGeoms, canGeoms: canDnsGeoms, parties, dimensions, geography }

    const cDnSampler = new CandidateDistributionSampler2D(canDnsGeoms, parties.partiesByCan)

    const sampler = new ElectionSampler()
    sampler.startSim()
    const samplingResult = sampler.addSim(geometry, cDnSampler, electionOptions)

    return samplingResult.points[0]
}
