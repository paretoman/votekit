/** @module */

import addAllocation from './addAllocation.js'
import Grid1D from './Grid1D.js'
import Grid2D from './Grid2D.js'

/**
 * Show votes
 * @param {VoterRendererList} voterRendererList
 * @param {CandidateViewList} candidateViewList
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function VizOneGrid(voterRendererList, candidateViewList, screen, sim) {
    const self = this

    // renderer factory //
    const { dimensions } = sim.election
    const Grid = (dimensions === 1) ? Grid1D : Grid2D
    const rendererMaker = () => new Grid(candidateViewList, screen)
    voterRendererList.setRenderer(rendererMaker)

    self.enter = function () {
        if (dimensions === 2) {
            screen.showMaps()
        }
    }
    self.exit = function () {
        screen.hideMaps()
        candidateViewList.unsetCandidateWins() // clean up fractions
    }

    self.update = function (electionResults) {
        const { error } = electionResults
        if (error !== undefined) return

        const { tallyFractions, allocation } = addAllocation(electionResults)
        candidateViewList.setCandidateWins(allocation)
        candidateViewList.setCandidateFractions(tallyFractions)

        const { gridData } = electionResults.votes
        voterRendererList.updateGraphic(gridData)
    }
    self.render = function () {
        if (sim.election.dimensions === 1) {
            voterRendererList.renderBackground()
        }

        voterRendererList.render()
    }
}
