/** @module */

/**
 * Super class
 * A SimVoter has functionality for a voter that is specific to a simulation.
 * Each SimVoter has a voter component.
 * The voter component is a VoterShape, for now.
 * This voter component is common to all simulations.
 * An example of a SimVoter is a GeoVoterBasis or a OneVoterCircle.
 * This is an inheritance structure.
 * @param {VoterShape} voterShape - a voter component that SimVoter builds upon.
 * @param {DraggableManager} dragm
 * @constructor
 */
export default function SimVoter(voterShape, dragm) {
    const self = this
    self.voter = voterShape

    dragm.newCircleHandle(voterShape, voterShape.circle)

    self.renderForeground = () => {
        self.voter.renderForeground()
    }
}
