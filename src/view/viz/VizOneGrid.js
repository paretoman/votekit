/** @module */

import Grid1D from './Grid1D.js'
import Grid2D from './Grid2D.js'

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

        const { sequenceName } = sequenceResults.electionOptions.sequenceOptions
        const { resultsPhaseBySeq, resultsPhaseIndexBySeq } = simOptions
        const resultsPhaseName = resultsPhaseBySeq[sequenceName]
        const resultsPhaseIndex = resultsPhaseIndexBySeq[resultsPhaseName]

        const phaseResults0 = sequenceResults.phases[resultsPhaseName]
        const phaseResults = (resultsPhaseIndex !== undefined) ? phaseResults0[resultsPhaseIndex] : phaseResults0

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
