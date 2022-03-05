import VoronoiGroup from './VoronoiGroup.js'

import SimVoter from './SimVoter.js'

/**
 * Adds functionality for showing votes
 * @param {VoterCircle} voterCircle
 * @param {DraggableManager} dragm
 * @param {Screen} screen
 */
export default function OneVoterCircle(voterCircle, dragm, screen) {
    const self = this
    SimVoter.call(self, voterCircle, dragm)

    const voronoiGroup = new VoronoiGroup(voterCircle, screen)

    self.update = function (candidates) {
        voronoiGroup.update(candidates)
    }

    // Graphics component
    self.render = function () {
        // circle
        voronoiGroup.render()
    }
}
