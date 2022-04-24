/** @module */

import Grid2D from './Grid2D.js'
import Voronoi2D from './Voronoi2D.js'

/**
 * Show votes
 * @param {Screen} screen
 * @constructor
 */
export default function VizOne2D(oneVoters, candidateSimList, screen, sim) {
    const self = this

    let voronoiGroups = []
    let grid2Ds = []

    self.update = function (votes) {
        const voterShapes = oneVoters.getVoterShapes()
        if (sim.election.countVotes.caster === 'castPlurality') {
            voronoiGroups = voterShapes.map(
                (voterShape) => new Voronoi2D(voterShape, candidateSimList, screen),
            )
        } else { // "score"
            if (votes.error) return
            grid2Ds = []
            for (let i = 0; i < votes.gridData.length; i++) {
                const vo = votes.gridData[i]

                const grid2D = new Grid2D(vo, candidateSimList, screen)
                grid2Ds.push(grid2D)
            }
        }
    }

    self.render = function () {
        if (sim.election.countVotes.caster === 'castPlurality') {
            voronoiGroups.forEach(
                (voronoiGroup) => voronoiGroup.render(),
            )
        } else { // "score"
            grid2Ds.forEach(
                (grid2D) => grid2D.render(),
            )
        }
    }
}
