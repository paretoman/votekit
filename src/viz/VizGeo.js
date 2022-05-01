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
export default function VizGeo(voterGeoList, candidateSimList, screen, sim, changes) {
    const self = this

    const geoMaps = new GeoMaps(voterGeoList, candidateSimList, screen, sim)
    let renderers

    self.update = function (voterList, geoElectionResults) {
        const { error } = geoElectionResults
        if (error !== undefined) return

        geoMaps.update(geoElectionResults)

        if (changes.check(['viz', 'geo'])) {
            screen.showMaps()
        }

        const { resultsStatewide, winsByDistrict } = geoElectionResults
        candidateSimList.setCandidateWins(winsByDistrict)
        candidateSimList.setCandidateFractions(resultsStatewide.votes.tallyFractions)

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
