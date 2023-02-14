/** @module */

import seedrandom from '../../election/src/lib/snowpack/build/snowpack/pkg/seedrandom.js'
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
    let rng

    self.startSim = function () {
        totalPoints = 0
        totalPartyWins = Array(10).fill(0) // TODO: Use number of parties
        const seed = '145275920'
        rng = seedrandom(seed)
    }

    self.addSim = function (samplingGeometry, electionOptions) {
        if (totalPoints > maxPoints) return { pointsChanged: false }

        const numSamples = 1
        const sampleResult = sampleElection(samplingGeometry, electionOptions, numSamples, rng)
        const { samplingPointsList, samplingPointsCount, partyWins, error } = sampleResult

        if (error !== undefined) return { pointsChanged: false }

        const numNewPoints = samplingPointsCount.reduce((p, c) => p + c)
        totalPoints += numNewPoints

        for (let i = 0; i < partyWins.length; i++) {
            totalPartyWins[i] += partyWins[i]
        }

        const partyWinFraction = totalPartyWins.map((x) => x / totalPoints)

        const pointsChanged = true
        const samplingResult = { pointsChanged, samplingPointsList, samplingPointsCount, partyWinFraction }
        return samplingResult
    }
}
