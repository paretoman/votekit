/** @module */

import Voronoi2D from './Voronoi2D.js'

/**
 * Show votes
 * @param {Screen} screen
 * @constructor
 */
export default function One2DViz(screen) {
    const self = this

    let voronoiGroups = []

    self.update = function (oneVoters, candidates) {
        const voterGroups = oneVoters.getVoterGroups()
        voronoiGroups = voterGroups.map(
            (voterShape) => new Voronoi2D(voterShape, candidates, screen),
        )
    }

    self.render = function () {
        voronoiGroups.forEach(
            (voronoiGroup) => voronoiGroup.render(),
        )
    }
}
