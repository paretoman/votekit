/** @module */

import GeoMaps from './GeoMaps.js'
import VoterRender1D from './VoterRender1D.js'
import VoterRender2D from './VoterRender2D.js'

/**
 * Show votes
 * @param {VoterGeo} voterGeo
 * @param {VoterRendererList} voterRendererList
 * @param {CandidateList} candidateList
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function VizGeo(voterGeo, voterRendererList, candidateList, screen, sim) {
    const self = this

    const geoMaps = new GeoMaps(voterGeo, candidateList, screen, sim)
    let flagNoRender = false

    const { dimensions } = sim.election
    const VoterRenderer = (dimensions === 1) ? VoterRender1D : VoterRender2D
    voterRendererList.setRenderer((voterShape) => new VoterRenderer(voterShape, screen))

    self.enter = () => {
        screen.showMaps()
    }
    self.exit = () => {
        screen.hideMaps()
    }

    self.update = function (geoElectionResults) {
        const { error } = geoElectionResults
        if (error !== undefined) {
            flagNoRender = true
            return
        }
        flagNoRender = false

        geoMaps.update(geoElectionResults)
    }

    self.render = function () {
        if (flagNoRender) return

        geoMaps.render()

        voterRendererList.render()
    }
}
