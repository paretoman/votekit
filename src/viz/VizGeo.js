/** @module */

import GeoMaps from './GeoMaps.js'
import VoterRender1D from './VoterRender1D.js'
import VoterRender2D from './VoterRender2D.js'

/**
 * Show votes
 * @param {VoterGeoList} voterGeoList
 * @param {CandidateSimList} candidateSimList
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function VizGeo(voterGeoList, candidateSimList, screen, sim) {
    const self = this

    const geoMaps = new GeoMaps(voterGeoList, screen, sim)
    let renderers

    self.update = function (voterList, electionResults) {
        geoMaps.update(electionResults)

        // renderer factory //

        const { dimensions } = sim.election
        const VoterRenderer = (dimensions === 1) ? VoterRender1D : VoterRender2D

        const voterShapes = voterList.getVoterShapes()
        renderers = voterShapes.map(
            (voterShape) => new VoterRenderer(voterShape, screen),
        )
    }

    self.render = function () {
        geoMaps.render()

        renderers.forEach(
            (renderer) => renderer.render(),
        )
    }
}
