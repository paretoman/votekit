/** @module */

import VoronoiGroup from './VoronoiGroup.js'

/**
 * Show votes
 * @param {Screen} screen
 * @constructor
 */
export default function OneViz(screen) {
    const self = this

    let voronoiGroups = []

    self.update = function (oneVoters, candidates) {
        const voterGroups = oneVoters.getVoterGroups()
        voronoiGroups = voterGroups.map(
            (voterShape) => new VoronoiGroup(voterShape, candidates, screen),
        )
    }

    self.render = function () {
        voronoiGroups.forEach(
            (voronoiGroup) => voronoiGroup.render(),
        )
    }
}
