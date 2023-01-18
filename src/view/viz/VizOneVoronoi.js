/** @module */

import Voronoi1D from './Voronoi1D.js'
import Voronoi2D from './Voronoi2D.js'

/**
 * Show votes
 * @param {VoterRendererList} voterRendererList
 * @param {CandidateList} candidateList
 * @param {Screen} screen
 * @constructor
 */
export default function VizOneVoronoi(voterRendererList, candidateList, screen, screenMini, simOptions) {
    const self = this

    // renderer factory //
    const { dimensions } = simOptions
    const Voronoi = (dimensions === 1) ? Voronoi1D : Voronoi2D
    const rendererMaker = (voterShape) => new Voronoi(voterShape, candidateList, screen)
    voterRendererList.setRenderer(rendererMaker)

    self.enter = () => {}
    self.exit = () => { }

    self.update = function (electionResults) {
        const { error } = electionResults
        if (error !== undefined) return

        voterRendererList.updateGraphic()
    }

    self.render = function () {
        voterRendererList.render()
    }
}
