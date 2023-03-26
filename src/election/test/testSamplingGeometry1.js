import makeGeography from '../src/geography/makeGeography.js'
import makeCandidateDistributionCDF from '../src/sampleElection/makeCandidateDistributionCDF.js'
import electionOptions1 from './electionOptions1.js'

const dimensions = 2

const voterGeoms = [
    { x: 0, y: 0, w: 200, densityProfile: 'step' },
]

const voterParties = [0]

const voterStrategyListByPhase = {
    general: [
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
    ],
}

const usePollsByPhase = {
    general: false,
}

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

const testSamplingGeometry1 = { voterGeoms, voterParties, canDnGeoms, parties, dimensions, geography, canDnCDF, samplingSeed, strategySeed, voterStrategyListByPhase, usePollsByPhase }

export default testSamplingGeometry1
