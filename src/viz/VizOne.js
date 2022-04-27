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
 * @param {VoterSimList} oneVoters
 * @param {CandidateSimList} candidateSimList
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function VizOne(oneVoters, candidateSimList, screen, sim) {
    const self = this

    const geoMaps = new GeoMaps(oneVoters, screen, sim)
    let geoVoterRenderers
    let voronoiGroups
    let grids

    self.update = function (electionResults) {
        if (sim.geo === true) {
            geoMaps.update(electionResults)

            const voterShapes = oneVoters.getVoterShapes()
            geoVoterRenderers = voterShapes.map(
                (voterShape) => ((sim.election.dimensions === 1)
                    ? new VoterRender1D(voterShape, screen)
                    : new VoterRender2D(voterShape, screen)),
            )
            return
        }
        const voterShapes = oneVoters.getVoterShapes()
        if (sim.election.countVotes.caster === 'castPlurality') {
            voronoiGroups = voterShapes.map(
                (voterShape) => ((sim.election.dimensions === 1)
                    ? new Voronoi1D(voterShape, candidateSimList, screen)
                    : new Voronoi2D(voterShape, candidateSimList, screen)),
            )
        } else { // "score"
            const { votes } = electionResults
            if (votes.error) return
            grids = []
            for (let i = 0; i < votes.gridData.length; i++) {
                const vo = votes.gridData[i]

                const grid = (sim.election.dimensions === 1)
                    ? new Grid1D(vo, candidateSimList, screen)
                    : new Grid2D(vo, candidateSimList, screen)
                grids.push(grid)
            }
        }
    }

    self.render = function () {
        if (sim.geo === true) {
            geoMaps.render()

            geoVoterRenderers.forEach(
                (geoVoterRenderer) => geoVoterRenderer.render(),
            )
            return
        }
        if (sim.election.countVotes.caster === 'castPlurality') {
            voronoiGroups.forEach(
                (voronoiGroup) => voronoiGroup.render(),
            )
        } else { // "score"
            grids.forEach(
                (grid) => grid.renderBackground(),
            )
            grids.forEach(
                (grid) => grid.render(),
            )
        }
    }
}
