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

    self.startSim = function () {
        points = []
    }

    self.addSim = function (sampleVoters, sampleCandidates) {
        // add more points

        if (sampleVoters.getVoterShapes().length === 0) return { noChange: 1 }
        if (sampleCandidates.getCandidateDistributions().length === 0) return { noChange: 1 }

        if (points.length > maxPoints) return { noChange: 1 }
        // this limit right now is about graphics rendering.
        // todo: render to a buffer

        // number of sample elections
        const ns = 20

        // number of new points
        const { seats } = election.countVotes
        const nnp = seats * ns
        const newPoints = Array(nnp)
        let q = 0

        const voterShapes = sampleVoters.getVoterShapes()

        for (let i = 0; i < ns; i++) {
            // choose a number of candidates
            let nk
            if (election.countVotes.checkElectionType() === 'singleWinner') {
                nk = 5
            } else if (election.countVotes.checkElectionType() === 'allocation') {
                nk = 10
            }
            const canList = []
            for (let k = 0; k < nk; k++) {
                // sample a point from the distribution of candidates
                const point = sampleCandidates.sampler.samplePoint()

                // make a candidate
                canList.push({ shape2: point })
            }

            // find winner position
            const electionResults = election.runElection(voterShapes, canList, optionCast)

            if (election.countVotes.checkElectionType() === 'singleWinner') {
                const { winner } = electionResults

                // record point
                const winPoint = winner.shape2
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
                            winPoint = can.shape2
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
        return { noChange: 0, newPoints, points }
    }
}
