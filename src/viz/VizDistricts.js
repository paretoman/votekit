/** @module */

import VizDistrictNoise from './VizDistrictNoise.js'
import VoterRender1D from './VoterRender1D.js'
import VoterRender2D from './VoterRender2D.js'

/**
 * Show votes
 * @param {VoterRendererList} voterRendererList
 * @param {CandidateList} candidateList
 * @param {Screen} screen
 * @constructor
 */
export default function VizDistricts(voterRendererList, candidateList, screen, screenMini, simOptions) {
    const self = this

    const { dimensions } = simOptions
    const VoterRenderer = (dimensions === 1) ? VoterRender1D : VoterRender2D
    voterRendererList.setRenderer((voterShape) => new VoterRenderer(voterShape, screen))

    const vizDistrictNoise = new VizDistrictNoise(screen)

    self.enter = () => { }
    self.exit = () => { }
    self.update = (districtElectionResults) => {
        vizDistrictNoise.update(districtElectionResults)
    }
    self.render = () => {
        voterRendererList.render()
        vizDistrictNoise.render()
    }
}
