/** @module */

import addAllocation from './addAllocation.js'
import Voronoi1D from './Voronoi1D.js'
import Voronoi2D from './Voronoi2D.js'

/**
 * Show votes
 * @param {VoterSimList} voterSimList
 * @param {CandidateSimList} candidateSimList
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function VizOneVoronoi(voterSimList, candidateSimList, screen, sim) {
    const self = this

    // renderer factory //
    const { dimensions } = sim.election
    const Voronoi = (dimensions === 1) ? Voronoi1D : Voronoi2D
    const rendererMaker = (voterShape) => new Voronoi(voterShape, candidateSimList, screen)
    voterSimList.setRenderer(rendererMaker)

    self.enter = () => {}
    self.exit = () => {
        candidateSimList.unsetCandidateWins() // clean up fractions
    }

    self.update = function (electionResults) {
        const { error } = electionResults
        if (error !== undefined) return

        const { tallyFractions, allocation } = addAllocation(electionResults)
        candidateSimList.setCandidateWins(allocation)
        candidateSimList.setCandidateFractions(tallyFractions)
        voterSimList.updateGraphic()
    }

    self.render = function () {
        voterSimList.render()
    }
}
