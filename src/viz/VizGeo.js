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
    let flagNoRender = false

    const { dimensions } = sim.election
    const VoterRenderer = (dimensions === 1) ? VoterRender1D : VoterRender2D

    voterGeoList.setRendererMaker((voterShape) => new VoterRenderer(voterShape, screen))

    self.update = function (geoElectionResults) {
        const { error } = geoElectionResults
        if (error !== undefined) {
            flagNoRender = true
            return
        }
        flagNoRender = false

        geoMaps.update(geoElectionResults)

        if (changes.check(['viz', 'geo'])) {
            screen.showMaps()
        }

        const { resultsStatewide, allocation } = geoElectionResults
        candidateSimList.setCandidateWins(allocation)
        candidateSimList.setCandidateFractions(resultsStatewide.votes.tallyFractions)
    }

    self.render = function () {
        if (flagNoRender) return

        geoMaps.render()

        voterGeoList.render()
    }
}
