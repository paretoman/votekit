/** @module */

import CandidateGraphic from '../vizEntities/CandidateGraphic.js'

/**
 * CandidateView has functionality for a candidate that is specific to a view.
 * CandidateView has a candidate component.
 * The candidate component is a Candidate, for now.

 * @param {Candidate} candidate - a candidate component that CandidateView builds upon.
 * @constructor
 */
export default function CandidateView(candidate, screen, wHandle, hHandle, viewSettings, simOptions, electionOptions) {
    const self = this
    self.candidate = candidate

    self.graphic = new CandidateGraphic(candidate, screen, wHandle, hHandle, viewSettings, simOptions, electionOptions)
}
