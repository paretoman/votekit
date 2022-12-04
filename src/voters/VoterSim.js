/** @module */

import VoterGraphic from '../vizEntities/VoterGraphic.js'

/**
 * Super class
 * A VoterSim has functionality for a voter that is specific to a simulation.
 * Each VoterSim has a voter component.
 * The voter component is a VoterShape, for now.
 * This voter component is common to all simulations.
 * An example of a VoterSim is a VoterGeoBasis.
 * This is an inheritance structure.
 * @param {VoterShape} voterShape - a voter component that VoterSim builds upon.
 * @constructor
 */
export default function VoterSim(voterShape, screen, election, view) {
    const self = this
    self.voterShape = voterShape

    self.graphic = new VoterGraphic(voterShape, screen, election, view)
}
