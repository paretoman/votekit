/** @module */

import OneDVoronoi from './OneDVoronoi.js'
import SimVoter from './SimVoter.js'

/**
 * Adds functionality for showing votes.
 * OneDVoterBlock is a subclass of SimVoter.
 * @param {VoterShape} voterShape
 * @param {DraggableManager} dragm
 * @param {Screen} screen
 * @constructor
 */
export default function OneDVoterBlock(voterShape, dragm, screen) {
    const self = this
    SimVoter.call(self, voterShape, dragm)

    const oneDVoronoiBlock = new OneDVoronoi(voterShape, screen)

    self.update = function (candidates) {
        oneDVoronoiBlock.update(candidates)
    }

    // Graphics component
    self.render = function () {
        // circle
        oneDVoronoiBlock.render()
    }
}
