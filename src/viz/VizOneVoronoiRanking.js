/** @module */

import VoronoiRanking1D from './VoronoiRanking1D.js'
import VoronoiRanking2D from './VoronoiRanking2D.js'

/**
 * Show votes
 * @param {VoterRendererList} voterRendererList
 * @param {CandidateList} candidateList
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
// eslint-disable-next-line max-len
export default function VizOneVoronoiRanking(voterRendererList, candidateList, screen, screenMini, sim, simOptions) {
    const self = this

    // renderer factory //
    const { dimensions } = simOptions
    const VoronoiRanking = (dimensions === 1) ? VoronoiRanking1D : VoronoiRanking2D
    const rendererMaker = (voterShape) => new VoronoiRanking(voterShape, candidateList, screen)
    voterRendererList.setRenderer(rendererMaker)

    self.enter = () => {}
    self.exit = () => { }

    self.update = function (electionResults) {
        const { error } = electionResults
        if (error !== undefined) return

        const { cellData } = electionResults.votes
        voterRendererList.updateGraphic(cellData)
    }

    self.render = function () {
        voterRendererList.render()
    }
}
