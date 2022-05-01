/** @module */

import Voronoi1D from './Voronoi1D.js'
import Voronoi2D from './Voronoi2D.js'

/**
 * Show votes
 * @param {VoterGeoList} voterGeoList
 * @param {CandidateSimList} candidateSimList
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function VizOneVoronoi(voterGeoList, candidateSimList, screen, sim, changes) {
    const self = this

    let renderers

    self.update = function (voterList, electionResults) {
        if (changes.check(['viz', 'electionMethod', 'dimensions'])) {
            screen.hideMaps()
        }

        const { error } = electionResults
        if (error !== undefined) return

        const { votes } = electionResults
        candidateSimList.setCandidateFractions(votes.tallyFractions)

        // renderer factory //

        const { dimensions } = sim.election
        const Voronoi = (dimensions === 1) ? Voronoi1D : Voronoi2D

        const voterShapes = voterList.getVoterShapes()
        renderers = voterShapes.map(
            (voterShape) => new Voronoi(voterShape, candidateSimList, screen),
        )
    }

    self.render = function () {
        renderers.forEach(
            (renderer) => renderer.render(),
        )
    }
}
