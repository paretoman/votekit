import createGeography from '../src/geography/createGeography.js'
import election from '../src/election/election.js'
import getCanBorders from '../src/voteCasters/voteCasters/getCanBorders.js'

export default function testElection() {
    const dimensions = 2

    const voterGeoms = [
        { x: 0, y: 0, w: 200, densityProfile: 'step' },
    ]

    const canGeoms = [
        { x: -50, y: 0 },
        { x: 50, y: 0 },
    ]

    const parties = [[0], [1]]

    const electionOptions = {
        numTracts: 2,
        numDistricts: 3,
        socialChoiceMethod: 'plurality',
        voteCasterName: 'plurality',
        socialChoiceType: 'singleWinner',
        castOptions: { usr: 4 },
        SocialChoiceOptions: {
            seats: 1,
            threshold: 0.1,
            numSampleCandidates: 10,
        },
    }

    const geography = createGeography(electionOptions, voterGeoms, dimensions)

    const geometry = {
        voterGeoms,
        canGeoms,
        parties,
        dimensions,
        geography,
    }
    geometry.canBorders = getCanBorders(canGeoms, voterGeoms, dimensions, electionOptions)

    const electionResults = election(geometry, electionOptions)

    return electionResults.socialChoiceResults.iWinner
}
