/** @module */

import sampleElection from '../../election/src/sampleElection/sampleElection.js'

/**
 * Simulate winners from many sampled elections.
 * Candidates are sampled from a distribution.
 * Winners are drawn as points.
 * The simulation is dynamic. More simulations are performed at each frame.
 * @constructor
 */
export default function ElectionSampler() {
    const self = this

    self.update = function (geometry, changes, electionOptions) {
        if (changes.checkAny()) {
            self.startSim()
        }

        const samplingResult = self.addSim(geometry, electionOptions)
        return samplingResult
    }

    const maxPoints = 5000

    let totalPartyWins
    let totalPoints

    self.startSim = function () {
        totalPoints = 0
        totalPartyWins = Array(10).fill(0) // TODO: Use number of parties
    }

    self.addSim = function (samplingGeometry, electionOptions) {
        if (totalPoints > maxPoints) return { pointsChanged: false }

        const numSamples = 1
        const { pointList, pointCount, partyWins, error } = sampleElection(samplingGeometry, electionOptions, numSamples)

        if (error !== undefined) return { pointsChanged: false }

        const numNewPoints = pointCount.reduce((p, c) => p + c)
        totalPoints += numNewPoints

        for (let i = 0; i < partyWins.length; i++) {
            totalPartyWins[i] += partyWins[i]
        }

        const partyWinFraction = totalPartyWins.map((x) => x / totalPoints)

        const samplingResult = {
            pointsChanged: true,
            newPointsList: pointList,
            newPointsCount: pointCount,
            partyWinFraction,
        }
        return samplingResult
    }
}
