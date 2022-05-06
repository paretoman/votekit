/** @module */

import CandidateGraphic from '../vizEntities/CandidateGraphic.js'

/**
 * CandidateSim has functionality for a candidate that is specific to a simulation.
 * CandidateSim has a candidate component.
 * The candidate component is a Candidate, for now.

 * @param {Candidate} candidate - a candidate component that CandidateSim builds upon.
 * @param {DraggableManager} dragm
 * @constructor
 */
export default function CandidateSim(candidate, dragm, screen) {
    const self = this
    self.candidate = candidate

    self.graphic = new CandidateGraphic(candidate, screen)

    dragm.newSquareHandle(candidate, self.graphic.square)
}
