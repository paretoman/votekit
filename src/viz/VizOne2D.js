/** @module */

import Voronoi2D from './Voronoi2D.js'

/**
 * Show votes
 * @param {Screen} screen
 * @constructor
 */
export default function VizOne2D(oneVoters, simCandidateList, screen) {
    const self = this

    let voronoiGroups = []

    self.update = function () {
        const voterGroups = oneVoters.getVoterGroups()
        voronoiGroups = voterGroups.map(
            (voterShape) => new Voronoi2D(voterShape, simCandidateList, screen),
        )
    }

    self.render = function () {
        voronoiGroups.forEach(
            (voronoiGroup) => voronoiGroup.render(),
        )
    }
}
