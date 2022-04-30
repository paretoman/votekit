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
export default function ElectionSampleGeo(election, electionGeo) {
    const self = this

    // const optionCast = { usr: 16 }

    const maxPoints = 5000

    let points = []

    self.update = function (sampleVoters, candidateSimList, changes) {
        if (changes.checkNone() === false) {
            self.startSim()
        }

        const addResult = self.addSim(sampleVoters, candidateSimList)
        return addResult
    }

    self.startSim = function () {
        points = []
    }

    self.addSim = function (sampleVoters, sampleCandidates) {
        // add more points

        if (sampleVoters.getVoterShapes().length === 0) return { pointsChanged: false }
        if (sampleCandidates.getCandidateDistributions().length === 0) {
            return { pointsChanged: false }
        }

        if (points.length > maxPoints) return { pointsChanged: false }
        // this limit right now is about graphics rendering.
        // todo: render to a buffer

        // number of sample elections
        const ns = 1

        // number of new points
        const { seats } = election.countVotes
        const { nd } = sampleVoters
        const nnp = seats * ns * nd
        const newPoints = Array(nnp)
        let q = 0

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
            const electionResults = electionGeo.runElection(sampleVoters, canList)

            const { resultsByDistrict } = electionResults
            const nDistricts = resultsByDistrict.length

            // adjustable parameter for visualization
            const jitterSize = 10

            if (election.countVotes.checkElectionType() === 'singleWinner') {
                let r = 0
                for (let o = 0; o < nDistricts; o++) {
                    const { winner } = resultsByDistrict[o]

                    // record point
                    let winPoint
                    if (r === 0) {
                        // record point
                        winPoint = winner.shape2
                    } else {
                        // add jitter
                        winPoint = {
                            x: winner.shape2.x + (Math.random() - 0.5) * jitterSize,
                            y: winner.shape2.y + (Math.random() - 0.5) * jitterSize,
                        }
                    }

                    points.push(winPoint)
                    newPoints[q] = winPoint
                    q += 1
                    r += 1
                }
            } else {
                let r = 0
                for (let o = 0; o < nDistricts; o++) {
                    const { allocation } = resultsByDistrict[o]

                    for (let k = 0; k < canList.length; k++) {
                        const can = canList[k]
                        const numPoints = allocation[k]
                        for (let m = 0; m < numPoints; m++) {
                            let winPoint
                            if (r === 0) {
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
                            r += 1
                        }
                    }
                }
            }
        }
        return { pointsChanged: true, newPoints, points }
    }
}
