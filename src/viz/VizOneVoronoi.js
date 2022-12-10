/** @module */

import addAllocation from './addAllocation.js'
import Voronoi1D from './Voronoi1D.js'
import Voronoi2D from './Voronoi2D.js'

/**
 * Show votes
 * @param {VoterRendererList} voterRendererList
 * @param {CandidateViewList} candidateViewList
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function VizOneVoronoi(voterRendererList, candidateViewList, screen, sim) {
    const self = this

    // renderer factory //
    const { dimensions } = sim.election
    const Voronoi = (dimensions === 1) ? Voronoi1D : Voronoi2D
    const rendererMaker = (voterShape) => new Voronoi(voterShape, candidateViewList, screen)
    voterRendererList.setRenderer(rendererMaker)

    self.enter = () => {}
    self.exit = () => {
        candidateViewList.unsetCandidateWins() // clean up fractions
    }

    self.update = function (electionResults) {
        const { error } = electionResults
        if (error !== undefined) return

        const { tallyFractions, allocation } = addAllocation(electionResults)
        candidateViewList.setCandidateWins(allocation)
        candidateViewList.setCandidateFractions(tallyFractions)
        voterRendererList.updateGraphic()
    }

    self.render = function () {
        voterRendererList.render()
    }
}
