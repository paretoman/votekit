/** @module */

import addAllocation from './addAllocation.js'
import VoronoiRanking1D from './VoronoiRanking1D.js'
import VoronoiRanking2D from './VoronoiRanking2D.js'

/**
 * Show votes
 * @param {VoterRendererList} voterRendererList
 * @param {CandidateViewList} candidateViewList
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function VizOneVoronoiRanking(voterRendererList, candidateViewList, screen, sim) {
    const self = this

    // renderer factory //
    const { dimensions } = sim.election
    const VoronoiRanking = (dimensions === 1) ? VoronoiRanking1D : VoronoiRanking2D
    const rendererMaker = (voterShape) => new VoronoiRanking(voterShape, candidateViewList, screen)
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
        const { cellData } = electionResults.votes
        voterRendererList.updateGraphic(cellData)
    }

    self.render = function () {
        voterRendererList.render()
    }
}
