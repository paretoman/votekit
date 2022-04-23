/** @module */

/**
 * CandidateSim has functionality for a candidate that is specific to a simulation.
 * CandidateSim has a candidate component.
 * The candidate component is a Candidate, for now.

 * @param {Candidate} candidate - a candidate component that CandidateSim builds upon.
 * @param {DraggableManager} dragm
 * @constructor
 */
export default function CandidateSim(candidate, dragm) {
    const self = this
    self.candidate = candidate

    dragm.newSquareHandle(candidate, candidate.square)

    self.renderForeground = () => {
        self.candidate.renderForeground()
    }
}
