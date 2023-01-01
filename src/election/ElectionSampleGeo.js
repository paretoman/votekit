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
export default function ElectionSampleGeo(electionGeo, voterGeo, electionOptions, socialChoiceOptions) {
    const self = this

    // const simCastOptions = { usr: 16 }

    const maxPoints = 5000

    let points = []

    self.update = function (voterShapeList, candidateDnList, cDnSampler, changes, dimensions) {
        if (changes.checkAny()) {
            self.startSim()
        }

        const addResult = self.addSim(voterShapeList, candidateDnList, cDnSampler, dimensions)
        return addResult
    }

    self.startSim = function () {
        points = []
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
        const ns = 1

        // number of new points
        const { seats } = socialChoiceOptions
        const { nd } = voterGeo
        const nnp = seats * ns * nd
        const newPoints = Array(nnp)
        let q = 0

        for (let i = 0; i < ns; i++) {
            // choose a number of candidates
            const nk = socialChoiceOptions.numSampleCandidates
            const canList = []
            for (let k = 0; k < nk; k++) {
                // sample a point from the distribution of candidates
                const point = cDnSampler.samplePoint()

                // make a candidate
                canList.push(point)
            }

            // find winner position
            const electionResults = electionGeo.runElectionGeo(voterShapeList, canList)

            const { resultsByDistrict } = electionResults
            const nDistricts = resultsByDistrict.length

            // adjustable parameter for visualization
            const jitterSize = 10

            if (electionOptions.electionType === 'singleWinner') {
                let r = 0
                for (let o = 0; o < nDistricts; o++) {
                    const { winner } = resultsByDistrict[o]

                    // record point
                    let winPoint
                    if (r === 0) {
                        // record point
                        winPoint = (dimensions === 1) ? winner.shape1 : winner.shape2
                    } else if (dimensions === 1) {
                        // add jitter
                        winPoint = {
                            x: winner.shape1.x + (Math.random() - 0.5) * jitterSize,
                        }
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
                            r += 1
                        }
                    }
                }
            }
        }
        return { pointsChanged: true, newPoints, points }
    }
}
