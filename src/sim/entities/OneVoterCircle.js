import VoronoiGroup from './VoronoiGroup.js'

import SimVoter from './SimVoter.js'

/**
 * Adds functionality for showing votes
 * @param {*} voterCircle
 * @param {*} screen
 */
export default function OneVoterCircle(voterCircle, screen) {
    const self = this
    SimVoter.call(self, voterCircle)

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
