/** @module */

import OneDVoronoi from './OneDVoronoi.js'
import SimVoter from './SimVoter.js'

/**
 * Adds functionality for showing votes.
 * OneDVoterBlock is a subclass of SimVoter.
 * @param {VoterCircle} voterCircle
 * @param {DraggableManager} dragm
 * @param {Screen} screen
 * @constructor
 */
export default function OneDVoterBlock(voterCircle, dragm, screen) {
    const self = this
    SimVoter.call(self, voterCircle, dragm)

    const oneDVoronoiBlock = new OneDVoronoi(voterCircle, screen)

    self.update = function (candidates) {
        oneDVoronoiBlock.update(candidates)
    }

    // Graphics component
    self.render = function () {
        // circle
        oneDVoronoiBlock.render()
    }
}
