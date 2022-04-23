/** @module */

import Voronoi1D from './Voronoi1D.js'

/**
 * Show votes
 * @param {Screen} screen
 * @constructor
 */
export default function VizOne1D(oneVoters, candidateSimList, screen) {
    const self = this

    let voronoiGroups = []

    self.update = function () {
        const voterShapes = oneVoters.getVoterShapes()
        voronoiGroups = voterShapes.map(
            (voterShape) => new Voronoi1D(voterShape, candidateSimList, screen),
        )
    }

    self.render = function () {
        voronoiGroups.forEach(
            (voronoiGroup) => voronoiGroup.render(),
        )
    }
}
