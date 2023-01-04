/** @module */

import VizGeoPolicyNoise from './VizGeoPolicyNoise.js'
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
export default function VizGeo(voterRendererList, candidateList, screen, screenMini, sim, simOptions) {
    const self = this

    const { dimensions } = simOptions
    const VoterRenderer = (dimensions === 1) ? VoterRender1D : VoterRender2D
    voterRendererList.setRenderer((voterShape) => new VoterRenderer(voterShape, screen))

    const vizGeoPolicyNoise = new VizGeoPolicyNoise(screen)

    self.enter = () => { }
    self.exit = () => { }
    self.update = (geoElectionResults) => {
        vizGeoPolicyNoise.update(geoElectionResults)
    }
    self.render = () => {
        voterRendererList.render()
        vizGeoPolicyNoise.render()
    }
}
