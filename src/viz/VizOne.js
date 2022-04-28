/** @module */

import Grid1D from './Grid1D.js'
import Grid2D from './Grid2D.js'
import Voronoi1D from './Voronoi1D.js'
import Voronoi2D from './Voronoi2D.js'
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
export default function VizOne(voterGeoList, candidateSimList, screen, sim) {
    const self = this

    const geoMaps = new GeoMaps(voterGeoList, screen, sim)
    let renderers

    self.update = function (voterList, electionResults) {
        if (sim.geo === true) {
            geoMaps.update(electionResults)
        }

        // renderer factory //

        const { dimensions } = sim.election
        const VoterRenderer = (dimensions === 1) ? VoterRender1D : VoterRender2D
        const Voronoi = (dimensions === 1) ? Voronoi1D : Voronoi2D
        const Grid = (dimensions === 1) ? Grid1D : Grid2D

        const voterShapes = voterList.getVoterShapes()
        if (sim.geo === true) {
            renderers = voterShapes.map(
                (voterShape) => new VoterRenderer(voterShape, screen),
            )
            return
        }
        if (sim.election.countVotes.caster === 'castPlurality') {
            renderers = voterShapes.map(
                (voterShape) => new Voronoi(voterShape, candidateSimList, screen),
            )
        } else { // "score"
            const { votes } = electionResults
            if (votes.error) renderers = []

            renderers = votes.gridData.map(
                (vo) => new Grid(vo, candidateSimList, screen),
            )
        }
    }

    self.render = function () {
        if (sim.geo === true) {
            geoMaps.render()
        }

        if (sim.geo === false && sim.election.countVotes.caster === 'castScore' && sim.election.dimensions === 1) {
            renderers.forEach(
                (renderer) => renderer.renderBackground(),
            )
        }

        renderers.forEach(
            (renderer) => renderer.render(),
        )
    }
}
