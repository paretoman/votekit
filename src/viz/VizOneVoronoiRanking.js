/** @module */

import addAllocation from './addAllocation.js'
import VoronoiRanking1D from './VoronoiRanking1D.js'
import VoronoiRanking2D from './VoronoiRanking2D.js'

/**
 * Show votes
 * @param {VoterSimList} voterSimList
 * @param {CandidateSimList} candidateSimList
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function VizOneVoronoiRanking(voterSimList, candidateSimList, screen, sim) {
    const self = this

    // renderer factory //
    const { dimensions } = sim.election
    const VoronoiRanking = (dimensions === 1) ? VoronoiRanking1D : VoronoiRanking2D
    const rendererMaker = (voterShape) => new VoronoiRanking(voterShape, candidateSimList, screen)
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
        const { cellData } = electionResults.votes
        voterSimList.updateGraphic(cellData)
    }

    self.render = function () {
        voterSimList.render()
    }
}
