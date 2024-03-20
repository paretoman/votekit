import makeGeography from '@paretoman/votekit-make-geography'
import { range } from '@paretoman/votekit-utilities'
import electionOptions1 from './optionsBag1.js'

const dimensions = 2

const voterGeoms = [
    { x: -100, y: 0, w: 100, densityProfile: 'step', densityMax: 1 },
    { x: 100, y: 0, w: 100, densityProfile: 'step', densityMax: 1 },
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

const voterStrategyListByPhase = {
    general: voterStrategyList,
    closedPrimary: voterStrategyList,
}

const voterParties = [0, 1]

const usePollsByPhase = {
    general: false,
    closedPrimary: false,
}

const information = null

const canPoints = [
    [-50, 10],
    [-50, 0],
    [50, 10],
    [50, 0],
]

const parties = {
    partiesByCan: [0, 0, 1, 1],
    numParties: 2,
}

const { numTracts, numDistricts } = electionOptions1

const geography = makeGeography(numTracts, numDistricts, voterGeoms, dimensions)
const strategySeed = 'pumpkin82000'
const testGeometry2Parties = { voterGeoms, voterParties, canPoints, parties, dimensions, geography, strategySeed, voterStrategyListByPhase, information, usePollsByPhase }

export default testGeometry2Parties
