/** @module */

import VoronoiGroup from './VoronoiGroup.js'

import SimVoter from '../voters/SimVoter.js'

/**
 * Adds functionality for showing votes
 * @param {VoterShape} voterShape
 * @param {DraggableManager} dragm
 * @param {Screen} screen
 * @constructor
 */
export default function OneVoterCircle(voterShape, dragm, screen) {
    const self = this
    SimVoter.call(self, voterShape, dragm)

    const voronoiGroup = new VoronoiGroup(voterShape, screen)

    self.update = function (candidates) {
        voronoiGroup.update(candidates)
    }

    // Graphics component
    self.render = function () {
        // circle
        voronoiGroup.render()
    }
}
