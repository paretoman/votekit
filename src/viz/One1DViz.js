/** @module */

import Voronoi1D from './Voronoi1D.js'

/**
 * Show votes
 * @param {Screen} screen
 * @constructor
 */
export default function One1DViz(screen) {
    const self = this

    let voronoiGroups = []

    self.update = function (oneVoters, candidates) {
        const voterGroups = oneVoters.getVoterGroups()
        voronoiGroups = voterGroups.map(
            (voterShape) => new Voronoi1D(voterShape, candidates, screen),
        )
    }

    self.render = function () {
        voronoiGroups.forEach(
            (voronoiGroup) => voronoiGroup.render(),
        )
    }
}
