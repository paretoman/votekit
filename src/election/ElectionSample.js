/** @module */

/**
 * Simulate winners from many sampled elections.
 * Candidates are sampled from a distribution.
 * Winners are drawn as points.
 * The simulation is dynamic. More simulations are performed at each frame.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Election} election
 * @constructor
 */
export default function ElectionSample(election) {
    const self = this

    const simCastOptions = { usr: 16 }

    const maxPoints = 5000

    let points = []
    let partyWins

    self.update = function (voterShapeList, candidateDnList, cDnSampler, changes, dimensions) {
        if (changes.checkAny()) {
            self.startSim()
        }

        const addResult = self.addSim(voterShapeList, candidateDnList, cDnSampler, dimensions)
        return addResult
    }

    self.startSim = function () {
        points = []
        partyWins = Array(10).fill(0) // TODO: Use number of parties
    }

    self.addSim = function (voterShapeList, candidateDnList, cDnSampler, dimensions) {
        // add more points

        if (voterShapeList.getVoterShapes().length === 0) return { pointsChanged: false }
        if (candidateDnList.getCandidateDistributions().length === 0) {
            return { pointsChanged: false }
        }

        if (points.length > maxPoints) return { pointsChanged: false }
        // this limit right now is about graphics rendering.
        // todo: render to a buffer

        // number of sample elections
        const ns = 20

        // number of new points
        const { seats } = election.socialChoice
        const nnp = seats * ns
        const newPoints = Array(nnp)
        let q = 0

        const voterShapes = voterShapeList.getVoterShapes()

        for (let i = 0; i < ns; i++) {
            // choose a number of candidates
            const nk = election.socialChoice.numSampleCandidates
            const canList = []
            for (let k = 0; k < nk; k++) {
                // sample a point from the distribution of candidates
                const point = cDnSampler.samplePoint()

                // make a candidate
                canList.push(point)
            }

            // find winner position
            const electionResults = election.runElection(voterShapes, canList, simCastOptions)

            if (election.socialChoice.checkElectionType() === 'singleWinner') {
                const { winner } = electionResults

                // record point
                const winPoint = (dimensions === 1) ? winner.shape1 : winner.shape2
                partyWins[winner.party] += 1
                points.push(winPoint)
                newPoints[i] = winPoint
            } else {
                const { allocation } = electionResults

                const jitterSize = 10
                for (let k = 0; k < canList.length; k++) {
                    const can = canList[k]
                    const numPoints = allocation[k]
                    for (let m = 0; m < numPoints; m++) {
                        let winPoint
                        if (m === 0) {
                            // record point
                            winPoint = (dimensions === 1) ? can.shape1 : can.shape2
                        } else if (dimensions === 1) {
                            // add jitter
                            winPoint = {
                                x: can.shape1.x + (Math.random() - 0.5) * jitterSize,
                            }
                        } else {
                            // add jitter
                            winPoint = {
                                x: can.shape2.x + (Math.random() - 0.5) * jitterSize,
                                y: can.shape2.y + (Math.random() - 0.5) * jitterSize,
                            }
                        }
                        // record point

                        // calculate fractions of wins
                        partyWins[can.party] += 1
                        points.push(winPoint)
                        newPoints[q] = winPoint
                        q += 1
                    }
                }
            }
        }

        const partyWinFraction = partyWins.map((x) => x / points.length)
        return {
            pointsChanged: true, newPoints, points, partyWinFraction,
        }
    }
}
