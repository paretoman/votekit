/** @module */

import CandidateGraphic from '../vizEntities/CandidateGraphic.js'

/**
 * CandidateSim has functionality for a candidate that is specific to a simulation.
 * CandidateSim has a candidate component.
 * The candidate component is a Candidate, for now.

 * @param {Candidate} candidate - a candidate component that CandidateSim builds upon.
 * @constructor
 */
export default function CandidateSim(candidate, screen, election, wHandle, hHandle, view) {
    const self = this
    self.candidate = candidate

    self.graphic = new CandidateGraphic(candidate, screen, election, wHandle, hHandle, view)
}
