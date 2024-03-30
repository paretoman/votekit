import makeGeography from '@paretoman/votekit-make-geography'
import { makeCandidateDistributionCDF } from '@paretoman/votekit-utilities'
import { optionsBag1 } from '@paretoman/votekit-election-sequence'

const dimensions = 2

const voterGeoms = [
    { x: 0, y: 0, w: 200, densityProfile: 'step', densityMax: 1 },
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

const { numTracts, numDistricts } = optionsBag1
const geography = makeGeography(numTracts, numDistricts, voterGeoms, dimensions)

const canDnCDF = makeCandidateDistributionCDF(canDnGeoms, dimensions)

const samplingSeed = '670171517'
const strategySeed = 'pumpkin1114'

const testSamplingGeometry1 = { voterGeoms, voterParties, canDnGeoms, parties, dimensions, geography, canDnCDF, samplingSeed, strategySeed, voterStrategyListByPhase, usePollsByPhase }

export default testSamplingGeometry1
