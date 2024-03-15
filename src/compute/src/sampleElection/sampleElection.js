import { last, randomIndexFromCDF } from '@paretoman/votekit-utilities'
import electionSequence from '@paretoman/votekit-election-sequence'
import sampleCanDnGeom from './sampleCanDnGeom.js'
/**
 * Do a series of elections, differing in candidate positions with a shaped distribution.
 * Each election may be a sequence of elections and may include polls. A spatial election model is used.
 * @param {*} samplingGeometry
 * @param {*} optionsBag
 * @param {*} numSamples
 * @param {*} rng
 * @returns
 */
export default function sampleElection(samplingGeometry, optionsBag, numSamples, rng) {
    const { voterGeoms, voterParties, canDnGeoms, dimensions, geography, canDnCDF, strategySeed, voterStrategyListByPhase, information, usePollsByPhase } = samplingGeometry
    const { partiesByCan } = samplingGeometry.parties

    if (voterGeoms.length === 0) return { pointsChanged: false }
    if (canDnGeoms.length === 0) return { pointsChanged: false }

    const samplingPointsList = []
    const samplingPointsCount = []
    const partyWins = Array(10).fill(0) // TODO: Use number of parties

    for (let i = 0; i < numSamples; i++) {
        // choose a number of candidates
        const { numSampleCandidates } = optionsBag
        const canPoints = []
        const sParties = []
        for (let k = 0; k < numSampleCandidates; k++) {
            // sample a point from the distribution of candidates
            const iDist = randomIndexFromCDF(canDnCDF, rng)
            const party0 = partiesByCan[iDist]
            const canDnGeom = canDnGeoms[iDist]
            const canPoint = sampleCanDnGeom(canDnGeom, dimensions, rng)

            // make a candidate
            canPoints.push(canPoint)
            sParties.push(party0)
        }

        const parties = { partiesByCan: sParties, numParties: 10 }
        const geometry = { voterGeoms, voterParties, canPoints, parties, dimensions, geography, strategySeed, voterStrategyListByPhase, information, usePollsByPhase }

        const sequenceResults = electionSequence(geometry, optionsBag)
        const { phaseNames } = sequenceResults
        const { allocation } = sequenceResults[last(phaseNames)].socialChoiceResults

        for (let k = 0; k < allocation.length; k++) {
            const winCount = allocation[k]
            if (winCount === 0) continue

            const canPoint = canPoints[k]
            const winPoint = (dimensions === 1) ? [canPoint] : canPoint
            const winParty = sParties[k]

            samplingPointsList.push(winPoint)
            samplingPointsCount.push(winCount)
            partyWins[winParty] += winCount
        }
    }
    return { samplingPointsList, samplingPointsCount, partyWins }
}
