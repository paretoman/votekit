/** @module */

import Voronoi1D from './Voronoi1D.js'
import SimVoter from '../voters/SimVoter.js'

/**
 * Adds functionality for showing votes.
 * @param {VoterShape} voterShape
 * @param {DraggableManager} dragm
 * @param {Screen} screen
 * @constructor
 */
export default function One1DViz(voterShape, dragm, screen) {
    const self = this
    SimVoter.call(self, voterShape, dragm)

    const oneDVoronoiBlock = new Voronoi1D(voterShape, screen)

    self.update = function (candidates) {
        oneDVoronoiBlock.update(candidates)
    }

    // Graphics component
    self.render = function () {
        // circle
        oneDVoronoiBlock.render()
    }
}
