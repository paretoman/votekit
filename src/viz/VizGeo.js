/** @module */

import GeoMaps from './GeoMaps.js'
import VoterRender1D from './VoterRender1D.js'
import VoterRender2D from './VoterRender2D.js'

/**
 * Show votes
 * @param {VoterGeo} voterGeo
 * @param {VoterViewList} voterViewList
 * @param {CandidateViewList} candidateViewList
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function VizGeo(voterGeo, voterViewList, candidateViewList, screen, sim) {
    const self = this

    const geoMaps = new GeoMaps(voterGeo, candidateViewList, screen, sim)
    let flagNoRender = false

    const { dimensions } = sim.election
    const VoterRenderer = (dimensions === 1) ? VoterRender1D : VoterRender2D
    voterViewList.setRenderer((voterShape) => new VoterRenderer(voterShape, screen))

    self.enter = () => {
        screen.showMaps()
    }
    self.exit = () => {
        screen.hideMaps()
        candidateViewList.unsetCandidateWins() // clean up fractions
    }

    self.update = function (geoElectionResults) {
        const { error } = geoElectionResults
        if (error !== undefined) {
            flagNoRender = true
            return
        }
        flagNoRender = false

        geoMaps.update(geoElectionResults)

        const { resultsStatewide, allocation } = geoElectionResults
        candidateViewList.setCandidateWins(allocation)
        candidateViewList.setCandidateFractions(resultsStatewide.votes.tallyFractions)
    }

    self.render = function () {
        if (flagNoRender) return

        geoMaps.render()

        voterViewList.render()
    }
}
