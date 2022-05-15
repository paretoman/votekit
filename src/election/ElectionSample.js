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

    const optionCast = { usr: 16 }

    const maxPoints = 5000

    let points = []

    self.update = function (voterSimList, candidateDnSimList, changes, dimensions) {
        if (changes.checkNone() === false) {
            self.startSim()
        }

        const addResult = self.addSim(voterSimList, candidateDnSimList, dimensions)
        return addResult
    }

    self.startSim = function () {
        points = []
    }

    self.addSim = function (voterSimList, candidateDnSimList, dimensions) {
        // add more points

        if (voterSimList.getVoterShapes().length === 0) return { pointsChanged: false }
        if (candidateDnSimList.getCandidateDistributions().length === 0) {
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

        const voterShapes = voterSimList.getVoterShapes()

        for (let i = 0; i < ns; i++) {
            // choose a number of candidates
            let nk
            if (election.socialChoice.checkElectionType() === 'singleWinner') {
                nk = 5
            } else if (election.socialChoice.checkElectionType() === 'allocation') {
                nk = 10
            }
            const canList = []
            for (let k = 0; k < nk; k++) {
                // sample a point from the distribution of candidates
                const point = candidateDnSimList.sampler.samplePoint()

                // make a candidate
                if (dimensions === 1) {
                    canList.push({ shape1: point })
                } else {
                    canList.push({ shape2: point })
                }
            }

            // find winner position
            const electionResults = election.runElection(voterShapes, canList, optionCast)

            if (election.socialChoice.checkElectionType() === 'singleWinner') {
                const { winner } = electionResults

                // record point
                const winPoint = (dimensions === 1) ? winner.shape1 : winner.shape2
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
                        points.push(winPoint)
                        newPoints[q] = winPoint
                        q += 1
                    }
                }
            }
        }
        return { pointsChanged: true, newPoints, points }
    }
}
