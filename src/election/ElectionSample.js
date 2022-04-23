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

    const maxPoints = 5000

    let points = []

    self.startSim = function () {
        points = []
    }

    self.addSim = function (sampleVoters, sampleCandidates) {
        // add more points

        if (sampleVoters.getVoterGroups().length === 0) return { noChange: 1 }
        if (sampleCandidates.getCandidateDistributions().length === 0) return { noChange: 1 }

        if (points.length > maxPoints) return { noChange: 1 }
        // this limit right now is about graphics rendering.
        // todo: render to a buffer

        // number of sample elections
        const ns = 20

        // number of new points
        const { seats } = election.method
        const nnp = seats * ns
        const newPoints = Array(nnp)

        const voterGroups = sampleVoters.getVoterGroups()

        for (let i = 0; i < ns; i++) {
            // choose a number of candidates
            let nk
            if (election.method.checkElectionType() === 'singleWinner') {
                nk = 5
            } else if (election.method.checkElectionType() === 'allocation') {
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
            const results = election.runElection(voterGroups, canList)

            if (election.method.checkElectionType() === 'singleWinner') {
                const { winner } = results

                // record point
                const winPoint = winner.shape2
                points.push(winPoint)
                newPoints[i] = winPoint
            } else {
                const { allocation } = results

                const jitterSize = 10
                let q = 0
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
                        newPoints[i * seats + q] = winPoint
                        q += 1
                    }
                }
            }
        }
        return { noChange: 0, newPoints, points }
    }
}
