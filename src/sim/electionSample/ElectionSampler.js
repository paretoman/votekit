/** @module */

import electionRun from '../../election/election/electionRun.js'
import electionDistrictsRun from '../../election/electionDistricts/electionDistrictsRun.js'

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

    let points = []
    let partyWins

    self.update = function (geometry, cDnSampler, changes, simOptions, electionOptions) {
        if (changes.checkAny()) {
            self.startSim()
        }

        const samplingResult = self.addSim(geometry, cDnSampler, simOptions, electionOptions)
        return samplingResult
    }

    self.startSim = function () {
        points = []
        partyWins = Array(10).fill(0) // TODO: Use number of parties
    }

    self.addSim = function (geometry, cDnSampler, simOptions, electionOptions) {
        // add more points

        const {
            voterGeoms, canGeoms, dimensions, voterDistricts,
        } = geometry

        if (voterGeoms.length === 0) return { pointsChanged: false }
        if (canGeoms.length === 0) {
            return { pointsChanged: false }
        }

        if (points.length > maxPoints) return { pointsChanged: false }
        // this limit right now is about graphics rendering.
        // todo: render to a buffer

        // number of sample elections
        const ns = 1

        // number of new points
        const { socialChoiceOptions } = electionOptions
        const { seats } = socialChoiceOptions
        const nd = simOptions.numDistricts
        const nnp = seats * ns * nd
        const newPoints = Array(nnp)
        let q = 0

        for (let i = 0; i < ns; i++) {
            // choose a number of candidates
            const nk = socialChoiceOptions.numSampleCandidates
            const sCanGeoms = []
            const sParties = []
            for (let k = 0; k < nk; k++) {
                // sample a point from the distribution of candidates
                const point = cDnSampler.samplePoint()

                // make a candidate
                const { canGeom, party } = point
                sCanGeoms.push(canGeom)
                sParties.push(party[0])
            }

            const sampleGeometry = {
                voterGeoms, canGeoms: sCanGeoms, parties: { partiesByCan: sParties, numParties: 10 }, dimensions, voterDistricts,
            }

            const election = (simOptions.useDistricts) ? electionDistrictsRun : electionRun
            const electionResults = election(sampleGeometry, electionOptions)
            const scResultsByDistrict = (simOptions.useDistricts)
                ? electionResults.scResultsByDistrict
                : [electionResults.socialChoiceResults]
            const nDistricts = scResultsByDistrict.length

            // adjustable parameter for visualization
            const jitterSize = 10

            if (electionOptions.electionType === 'singleWinner') {
                let r = 0
                for (let o = 0; o < nDistricts; o++) {
                    const { iWinner } = scResultsByDistrict[o]

                    // record point
                    const { x, y } = sCanGeoms[iWinner]
                    // add jitter
                    let winPoint
                    if (r === 0) {
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
                    newPoints[q] = winPoint
                    q += 1
                    r += 1

                    const winParty = sParties[iWinner]
                    partyWins[winParty] += 1
                }
            } else {
                let r = 0
                for (let o = 0; o < nDistricts; o++) {
                    const { allocation } = scResultsByDistrict[o]

                    for (let k = 0; k < sCanGeoms.length; k++) {
                        const { x, y } = sCanGeoms[k]
                        const party = sParties[k]
                        const numPoints = allocation[k]

                        for (let m = 0; m < numPoints; m++) {
                            // add jitter
                            let winPoint
                            if (r === 0) {
                                winPoint = [x, y]
                            } else if (dimensions === 1) {
                                winPoint = [x + (Math.random() - 0.5) * jitterSize]
                            } else {
                                winPoint = [
                                    x + (Math.random() - 0.5) * jitterSize,
                                    y + (Math.random() - 0.5) * jitterSize,
                                ]
                            }

                            // record point
                            points.push(winPoint)
                            newPoints[q] = winPoint
                            q += 1
                            r += 1

                            // calculate fractions of wins
                            partyWins[party] += 1
                        }
                    }
                }
            }
        }
        const partyWinFraction = partyWins.map((x) => x / points.length)

        const samplingResult = {
            pointsChanged: true, newPoints, points, partyWinFraction,
        }
        return samplingResult
    }
}
