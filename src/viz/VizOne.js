/** @module */

import Grid1D from './Grid1D.js'
import Grid2D from './Grid2D.js'
import Voronoi1D from './Voronoi1D.js'
import Voronoi2D from './Voronoi2D.js'

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

    let voronoiGroups = []
    let grids = []

    self.update = function (votes) {
        const voterShapes = oneVoters.getVoterShapes()
        if (sim.election.countVotes.caster === 'castPlurality') {
            voronoiGroups = voterShapes.map(
                (voterShape) => ((sim.election.dimensions === 1)
                    ? new Voronoi1D(voterShape, candidateSimList, screen)
                    : new Voronoi2D(voterShape, candidateSimList, screen)),
            )
        } else { // "score"
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
