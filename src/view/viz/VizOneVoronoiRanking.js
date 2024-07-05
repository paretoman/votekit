/** @module */

import BeatMap from '../vizBeatMap/BeatMap.js'
import VoronoiRanking1D from './VoronoiRanking1D.js'
import VoronoiRanking2D from './VoronoiRanking2D.js'

/**
 * Show votes
 * @param {VoterRendererList} voterRendererList
 * @param {CandidateList} candidateList
 * @param {Screen} screen
 * @constructor
 */
// eslint-disable-next-line max-len
export default function VizOneVoronoiRanking(voterRendererList, candidateList, screen, screenMini, simOptions) {
    const self = this

    // renderer factory //
    const { dimensions } = simOptions
    const VoronoiRanking = (dimensions === 1) ? VoronoiRanking1D : VoronoiRanking2D
    const rendererMaker = (voterShape) => new VoronoiRanking(voterShape, candidateList, screen)
    voterRendererList.setRenderer(rendererMaker)

    const beatMap = new BeatMap()
    let doBeatMap

    self.enter = () => {}
    self.exit = () => { }


    self.update = function (phaseResults) {
        const { error } = phaseResults
        if (error !== undefined) return

        const { votesByGeom } = phaseResults.votes

        voterRendererList.updateGraphic(votesByGeom)

        // if (phaseResults.)
        const {socialChoiceMethod} = phaseResults.electionOptions
        doBeatMap = (socialChoiceMethod === 'minimax')
        if ( doBeatMap) {
            const canList = candidateList.getEntities()
            beatMap.update(phaseResults, canList)
        }
    }

    self.render = function () {
        
        if ( doBeatMap) {
            const { ctx } = screen
            beatMap.render(ctx)
        }
        voterRendererList.render()
    }
}
