/** @module */

import Grid1D from './Grid1D.js'
import Grid2D from './Grid2D.js'

/**
 * Show votes
 * @param {VoterRendererList} voterRendererList
 * @param {CandidateList} candidateList
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function VizOneGrid(voterRendererList, candidateList, screenMain, screenMini, sim) {
    const self = this

    // renderer factory //
    const { dimensions } = sim.election
    const Grid = (dimensions === 1) ? Grid1D : Grid2D
    const rendererMaker = () => new Grid(candidateList, screenMain, screenMini)
    voterRendererList.setRenderer(rendererMaker)

    self.enter = function () {
        if (dimensions === 2) {
            screenMini.show()
        }
    }
    self.exit = function () {
        screenMini.hide()
    }

    self.update = function (electionResults) {
        const { error } = electionResults
        if (error !== undefined) return

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
