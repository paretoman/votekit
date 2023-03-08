import makeGeography from '../src/geography/makeGeography.js'
import election from '../src/election/election.js'
import getCanBorders from '../src/voteCasters/voteCasters/getCanBorders.js'
import electionOptions1 from './electionOptions1.js'

export default function testElection() {
    const dimensions = 2

    const voterGeoms = [
        { x: 0, y: 0, w: 200, densityProfile: 'step' },
    ]

    const voterGroupBehaviorList = [
        {
            strategyCDF: [1],
            strategyList: [
                {
                    strategyName: 'normalize',
                    strategyOptions: {
                        threshold: {
                            type: 'normal',
                            mean: 0.5,
                            stdDev: 0.1,
                        },
                        utility: { type: 'linear' },
                    },
                },
            ],
        },
    ]

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

    const canBorders = getCanBorders(canPoints, voterGeoms, dimensions, electionOptions)
    const geography = makeGeography(electionOptions, voterGeoms, dimensions)
    const strategySeed = 'pumpkin82000'
    const geometry = { voterGeoms, canPoints, parties, dimensions, canBorders, geography, strategySeed, voterGroupBehaviorList, information }

    const electionResults = election(geometry, electionOptions)

    return electionResults.socialChoiceResults.iWinner
}
