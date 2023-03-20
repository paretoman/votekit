import makeGeography from '../src/geography/makeGeography.js'
import election from '../src/election/election.js'
import electionOptions1 from './electionOptions1.js'

export default function testElection() {
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

    const geography = makeGeography(electionOptions, voterGeoms, dimensions)
    const strategySeed = 'pumpkin82000'
    const geometry = { voterGeoms, canPoints, parties, dimensions, geography, strategySeed, voterStrategyList, information, usePolls }

    const electionResults = election(geometry, electionOptions)

    return electionResults.socialChoiceResults.iWinner
}
