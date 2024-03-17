/** @module */

import Grid1D from './Grid1D.js'
import Grid2D from './Grid2D.js'
import selectPhaseResultsToDisplay from '../phase/selectPhaseResultsToDisplay.js'

/**
 * Show votes
 * @param {VoterRendererList} voterRendererList
 * @param {CandidateList} candidateList
 * @param {Screen} screen
 * @constructor
 */
export default function VizOneGrid(voterRendererList, candidateList, screenMain, screenMini, simOptions) {
    const self = this

    // renderer factory //
    const { dimensions } = simOptions
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

    self.update = function (sequenceResults) {
        const { error } = sequenceResults
        if (error !== undefined) return
        const phaseResults = selectPhaseResultsToDisplay(sequenceResults, simOptions)
        const { votesByGeom } = phaseResults.votes
        voterRendererList.updateGraphic(votesByGeom)
    }
    self.render = function () {
        if (dimensions === 1) {
            voterRendererList.renderBackground()
        }

        voterRendererList.render()
    }
}
