/** @module */

import CandidateDnGraphic from '../vizEntities/CandidateDnGraphic.js'

/**
 * CandidateSim has functionality for a canDn that is specific to a simulation.
 * CandidateSim has a canDn component.
 * The canDn component is a CandidateDn, for now.

 * @param {CandidateDn} canDn - a canDn component that CandidateSim builds upon.
 * @param {DraggableManager} dragm
 * @constructor
 */
export default function CandidateDnSim(canDn, dragm, screen, election) {
    const self = this
    self.canDn = canDn

    self.graphic = new CandidateDnGraphic(canDn, screen, election)

    dragm.newSquareHandle(canDn, self.graphic.square)
}
