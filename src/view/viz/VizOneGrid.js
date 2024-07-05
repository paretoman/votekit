/** @module */

import BeatMap from '../vizBeatMap/BeatMap.js'
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

    const beatMap = new BeatMap()
    let doBeatMap

    self.enter = function () {
        if (dimensions === 2) {
            screenMini.show()
        }
    }
    self.exit = function () {
        screenMini.hide()
    }

    self.update = function (phaseResults) {
        const { error } = phaseResults
        if (error !== undefined) return
        const { votesByGeom } = phaseResults.votes
        voterRendererList.updateGraphic(votesByGeom)        
        
        const {socialChoiceMethod} = phaseResults.electionOptions
        doBeatMap = (socialChoiceMethod === 'minimax')
        if ( doBeatMap) {
            const canList = candidateList.getEntities()
            beatMap.update(phaseResults, canList)
        }
    }
    self.render = function () {
        if (dimensions === 1) {
            voterRendererList.renderBackground()
        }
        if (dimensions === 2) {  
            if (doBeatMap) {        
                const { ctx } = screenMain
                beatMap.render(ctx)
            }
        }
        voterRendererList.render()
    }
}
