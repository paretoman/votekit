/** @module */

import GeoMaps from './GeoMaps.js'
import VoterRender1D from './VoterRender1D.js'
import VoterRender2D from './VoterRender2D.js'

/**
 * Show votes
 * @param {Screen} screen
 * @constructor
 */

/**
 * Show votes
 * @param {VoterSimList} oneVoters
 * @param {CandidateSimList} candidateSimList
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function VizGeo(oneVoters, candidateSimList, screen, sim) {
    const self = this

    const geoMaps = new GeoMaps(oneVoters, screen, sim)

    let geoVoterRenderers

    self.update = function (geoElectionResults) {
        geoMaps.update(geoElectionResults)

        const voterShapes = oneVoters.getVoterShapes()
        geoVoterRenderers = voterShapes.map(
            (voterShape) => ((sim.election.dimensions === 1)
                ? new VoterRender1D(voterShape, screen)
                : new VoterRender2D(voterShape, screen)),
        )
    }
    self.render = function () {
        geoMaps.render()

        geoVoterRenderers.forEach(
            (geoVoterRenderer) => geoVoterRenderer.render(),
        )
    }
}
