/** @module */

import Grid1D from './Grid1D.js'
import Voronoi1D from './Voronoi1D.js'

/**
 * Show votes
 * @param {Screen} screen
 * @constructor
 */
export default function VizOne1D(oneVoters, candidateSimList, screen, sim) {
    const self = this

    let voronoiGroups = []
    let grid1Ds = []

    self.update = function (votes) {
        const voterShapes = oneVoters.getVoterShapes()
        if (sim.election.countVotes.caster === 'plurality') {
            voronoiGroups = voterShapes.map(
                (voterShape) => new Voronoi1D(voterShape, candidateSimList, screen),
            )
        } else { // "score"
            grid1Ds = []
            for (let i = 0; i < votes.gridData.length; i++) {
                const vo = votes.gridData[i]

                const grid1D = new Grid1D(vo, candidateSimList, screen)
                grid1Ds.push(grid1D)
            }
        }
    }

    self.render = function () {
        if (sim.election.countVotes.caster === 'plurality') {
            voronoiGroups.forEach(
                (voronoiGroup) => voronoiGroup.render(),
            )
        } else { // "score"
            grid1Ds.forEach(
                (grid1D) => grid1D.render(),
            )
        }
    }
}
