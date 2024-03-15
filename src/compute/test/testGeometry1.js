import makeGeography from '../src/makeGeography/makeGeography.js'
import optionsBag1 from './optionsBag1.js'

const dimensions = 2

const voterGeoms = [
    { x: 0, y: 0, w: 200, densityProfile: 'step' },
]

const voterStrategyListByPhase = {
    general:
    [
        {
            strategyCDF: [1],
            strategy: [
                {
                    actionName: 'closest',
                    actionWeight: 1,
                    actionOptions: { },
                },
            ],
        },
    ],
    nonpartisanOpenPrimary:
    [
        {
            strategyCDF: [1],
            strategy: [
                {
                    actionName: 'closest',
                    actionWeight: 1,
                    actionOptions: { },
                },
            ],
        },
    ],
}

const usePollsByPhase = {
    general: false,
    nonpartisanOpenPrimary: false,
}

const information = null

const canPoints = [
    [-50, 0],
    [50, 0],
]

const parties = {
    partiesByCan: [0, 1],
    numParties: 2,
}

const { numTracts, numDistricts } = optionsBag1

const geography = makeGeography(numTracts, numDistricts, voterGeoms, dimensions)
const strategySeed = 'pumpkin82000'
const testGeometry1 = { voterGeoms, canPoints, parties, dimensions, geography, strategySeed, voterStrategyListByPhase, information, usePollsByPhase }

export default testGeometry1
