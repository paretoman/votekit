import election from '../election/election.js'
import { randomIndexFromCDF } from '../election/mathHelpers.js'
import getCanBorders from '../voteCasters/voteCasters/getCanBorders.js'
import sampleCanDnGeom from './sampleCanDnGeom.js'

export default function sampleElection(samplingGeometry, electionOptions, numSamples) {
    const { voterGeoms, canDnGeoms, dimensions, geography, canDnCDF } = samplingGeometry
    const { partiesByCan } = samplingGeometry.parties

    if (voterGeoms.length === 0) return { pointsChanged: false }
    if (canDnGeoms.length === 0) return { pointsChanged: false }

    // number of new points
    const { socialChoiceOptions } = electionOptions

    const pointList = []
    const pointCount = []
    const partyWins = Array(10).fill(0) // TODO: Use number of parties

    for (let i = 0; i < numSamples; i++) {
        // choose a number of candidates
        const { numSampleCandidates } = socialChoiceOptions
        const canGeoms = []
        const sParties = []
        for (let k = 0; k < numSampleCandidates; k++) {
            // sample a point from the distribution of candidates
            const iDist = randomIndexFromCDF(canDnCDF)
            const party = [partiesByCan[iDist]]
            const canDnGeom = canDnGeoms[iDist]
            const canGeom = sampleCanDnGeom(canDnGeom, dimensions)

            // make a candidate
            canGeoms.push(canGeom)
            sParties.push(party[0])
        }

        const canBorders = getCanBorders(canGeoms, voterGeoms, dimensions, electionOptions)
        const parties = { partiesByCan: sParties, numParties: 10 }
        const geometry = { voterGeoms, canGeoms, parties, dimensions, geography, canBorders }

        const electionResults = election(geometry, electionOptions)
        const { allocation } = electionResults.socialChoiceResults

        for (let k = 0; k < allocation.length; k++) {
            const winCount = allocation[k]
            if (winCount === 0) continue

            const { x, y } = canGeoms[k]
            const winPoint = (dimensions === 1) ? [x] : [x, y]
            const winParty = sParties[k]

            pointList.push(winPoint)
            pointCount.push(winCount)
            partyWins[winParty] += winCount
        }
    }
    return { pointList, pointCount, partyWins }
}
