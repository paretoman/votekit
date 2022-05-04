/** @module */

/**
 * CandidateSim has functionality for a canDn that is specific to a simulation.
 * CandidateSim has a canDn component.
 * The canDn component is a CandidateDn, for now.

 * @param {CandidateDn} canDn - a canDn component that CandidateSim builds upon.
 * @param {DraggableManager} dragm
 * @constructor
 */
export default function CandidateDnSim(canDn, dragm) {
    const self = this
    self.canDn = canDn

    dragm.newSquareHandle(canDn, canDn.graphic.square)
}
