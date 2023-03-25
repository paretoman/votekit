import makeGeography from '../src/geography/makeGeography.js'
import makeCandidateDistributionCDF from '../src/sampleElection/makeCandidateDistributionCDF.js'
import electionOptions1 from './electionOptions1.js'

const dimensions = 2

const voterGeoms = [
    { x: 0, y: 0, w: 200, densityProfile: 'step' },
]

const voterStrategyList = [
    {
        strategyCDF: [1],
        strategy: [
            {
                actionName: 'normalize',
                actionWeight: 1,
                actionOptions: { },
            },
        ],
    },
]

const usePolls = false

const canDnGeoms = [
    { x: 0, y: 0, w: 200, densityProfile: 'step' },
]

const parties = {
    partiesByCan: [0, 1],
    numParties: 2,
}

const electionOptions = electionOptions1

const { numTracts, numDistricts } = electionOptions
const geography = makeGeography(numTracts, numDistricts, voterGeoms, dimensions)

const canDnCDF = makeCandidateDistributionCDF(canDnGeoms, dimensions)

const samplingSeed = '670171517'
const strategySeed = 'pumpkin1114'

const testSamplingGeometry1 = { voterGeoms, canDnGeoms, parties, dimensions, geography, canDnCDF, samplingSeed, strategySeed, voterStrategyList, usePolls }

export default testSamplingGeometry1
