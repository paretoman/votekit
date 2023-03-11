/** @module */

import VoterGraphic from './VoterGraphic.js'

/**
 * Super class
 * A VoterView has functionality for a voter that is specific to a simulation.
 * Each VoterView has a voter component.
 * The voter component is a VoterShape, for now.
 * This voter component is common to all views.
 * @param {VoterShape} voterShape - a voter component that VoterView builds upon.
 * @constructor
 */
export default function VoterView(voterShape, screen, viewSettings, simOptions, electionOptionsMan) {
    const self = this
    self.voterShape = voterShape

    self.graphic = new VoterGraphic(voterShape, screen, viewSettings, simOptions, electionOptionsMan)
}
