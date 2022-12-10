/** @module */

import VoterRender1D from './VoterRender1D.js'
import VoterRender2D from './VoterRender2D.js'

/**
 * Show votes
 * @param {VoterRendererList} voterRendererList
 * @param {CandidateList} candidateList
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function VizGeo(voterRendererList, candidateList, screen, sim) {
    const self = this

    const { dimensions } = sim.election
    const VoterRenderer = (dimensions === 1) ? VoterRender1D : VoterRender2D
    voterRendererList.setRenderer((voterShape) => new VoterRenderer(voterShape, screen))

    self.enter = () => { }
    self.exit = () => { }
    self.update = () => { }
    self.render = () => {
        voterRendererList.render()
    }
}
