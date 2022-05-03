/** @module */

/**
 * Super class
 * A VoterSim has functionality for a voter that is specific to a simulation.
 * Each VoterSim has a voter component.
 * The voter component is a VoterShape, for now.
 * This voter component is common to all simulations.
 * An example of a VoterSim is a VoterGeoBasis.
 * This is an inheritance structure.
 * @param {VoterShape} voterShape - a voter component that VoterSim builds upon.
 * @param {DraggableManager} dragm
 * @constructor
 */
export default function VoterSim(voterShape, dragm) {
    const self = this
    self.voterShape = voterShape

    dragm.newCircleHandle(voterShape, voterShape.graphic.circle)

    self.renderForeground = () => {
        self.voterShape.renderForeground()
    }
}
