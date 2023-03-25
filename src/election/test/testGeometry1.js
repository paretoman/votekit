import makeGeography from '../src/geography/makeGeography.js'
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
                actionName: 'closest',
                actionWeight: 1,
                actionOptions: { },
            },
        ],
    },
]

const usePolls = false

const information = null

const canPoints = [
    [-50, 0],
    [50, 0],
]

const parties = {
    partiesByCan: [0, 1],
    numParties: 2,
}

const electionOptions = electionOptions1
const { numTracts, numDistricts } = electionOptions

const geography = makeGeography(numTracts, numDistricts, voterGeoms, dimensions)
const strategySeed = 'pumpkin82000'
const testGeometry1 = { voterGeoms, canPoints, parties, dimensions, geography, strategySeed, voterStrategyList, information, usePolls }

export default testGeometry1
