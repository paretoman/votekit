/** @module */

import seedrandom from '../../compute/src/lib/snowpack/build/snowpack/pkg/seedrandom.js'
import sampleElection from '../../compute/src/sampleElection/sampleElection.js'

/**
 * Simulate winners from many sampled elections.
 * Candidates are sampled from a distribution.
 * Winners are drawn as points.
 * The simulation is dynamic. More simulations are performed at each frame.
 * @constructor
 */
export default function ElectionSampler() {
    const self = this

    self.update = function (samplingGeometry, changes, optionsBag) {
        if (changes.checkAny()) {
            self.startSim(samplingGeometry)
        }

        const samplingResult = self.addSim(samplingGeometry, optionsBag)
        return samplingResult
    }

    const maxPoints = 5000

    let totalPartyWins
    let totalPoints
    let rng

    self.startSim = function (samplingGeometry) {
        totalPoints = 0
        totalPartyWins = Array(10).fill(0) // TODO: Use number of parties

        const seed = `watermelon${samplingGeometry.samplingSeed}`
        rng = seedrandom(seed)
    }

    self.addSim = function (samplingGeometry, optionsBag) {
        if (totalPoints > maxPoints) return { pointsChanged: false }

        const numSamples = 1
        const sampleResult = sampleElection(samplingGeometry, optionsBag, numSamples, rng)
        const { samplingPointsList, samplingPointsCount, partyWins, error } = sampleResult

        if (error !== undefined) return { pointsChanged: false }
        if (sampleResult.pointsChanged === false) return { pointsChanged: false }

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
