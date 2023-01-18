/** @module */

import CandidateDnGraphic from './CandidateDnGraphic.js'

/**
 * CandidateDnView has functionality for a canDn that is specific to a view.
 * CandidateDnView has a canDn component.
 * The canDn component is a CandidateDn, for now.

 * @param {CandidateDn} canDn - a canDn component that CandidateView builds upon.
 * @constructor
 */
export default function CandidateDnView(canDn, screen, wHandle, hHandle, viewSettings, simOptions, electionOptions) {
    const self = this
    self.canDn = canDn

    self.graphic = new CandidateDnGraphic(canDn, screen, wHandle, hHandle, viewSettings, simOptions, electionOptions)
}
