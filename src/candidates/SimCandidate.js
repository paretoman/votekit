/** @module */

/**
 * SimCandidate has functionality for a candidate that is specific to a simulation.
 * SimCandidate has a candidate component.
 * The candidate component is a Candidate, for now.

 * @param {Candidate} candidate - a candidate component that SimCandidate builds upon.
 * @param {DraggableManager} dragm
 * @constructor
 */
export default function SimCandidate(candidate, dragm) {
    const self = this
    self.candidate = candidate

    dragm.newSquareHandle(candidate, candidate.square)

    self.renderForeground = () => {
        self.candidate.renderForeground()
    }
}
