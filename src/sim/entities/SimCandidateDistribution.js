/**
 * SimCandidate has functionality for a canDn that is specific to a simulation.
 * SimCandidate has a canDn component.
 * The canDn component is a CandidateDistribution, for now.

 * @param {CandidateDistribution} canDn - a canDn component that SimCandidate builds upon.
 * @param {DraggableManager} dragm
 */
export default function SimCandidateDistribution(canDn, dragm) {
    const self = this
    self.canDn = canDn

    dragm.newSquareHandle(canDn, canDn.square)

    self.renderForeground = () => {
        self.canDn.renderForeground()
    }
}
