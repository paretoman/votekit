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

    const maxPoints = 5000

    let points
    let totalPartyWins
    let totalCount

    self.startSim = function () {
        points = []
        totalCount = 0
        totalPartyWins = Array(10).fill(0) // TODO: Use number of parties
    }

    self.addSim = function (samplingGeometry, electionOptions) {
        if (points.length > maxPoints) return { pointsChanged: false }

        // add more points

        // this limit right now is about graphics rendering.
        // todo: render to a buffer

        // number of sample elections
        const numSamples = 1

        const { pointList, pointCount, partyWins, error } = sampleElection(samplingGeometry, electionOptions, numSamples)

        if (error !== undefined) return { pointsChanged: false }

        // add jitter
        const jitterSize = 10
        const { dimensions } = samplingGeometry
        const newPoints = []
        for (let i = 0; i < pointList.length; i++) {
            const point = pointList[i]
            const count = pointCount[i]
            totalCount += count

            const [x, y] = point
            for (let m = 0; m < count; m++) {
                // add jitter
                let winPoint
                if (m === 0) {
                    winPoint = [x, y]
                } else if (dimensions === 1) {
                    winPoint = [x + (Math.random() - 0.5) * jitterSize]
                } else {
                    winPoint = [
                        x + (Math.random() - 0.5) * jitterSize,
                        y + (Math.random() - 0.5) * jitterSize,
                    ]
                }
                points.push(winPoint)
                newPoints.push(winPoint)
            }
        }
        for (let i = 0; i < partyWins.length; i++) {
            totalPartyWins[i] += partyWins[i]
        }

        const partyWinFraction = totalPartyWins.map((x) => x / totalCount)

        const samplingResult = {
            pointsChanged: true, newPoints, points, partyWinFraction,
        }
        return samplingResult
    }
}
