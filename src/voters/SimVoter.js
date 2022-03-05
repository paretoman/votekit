/**
 * Super class
 * A SimVoter has functionality for a voter that is specific to a simulation.
 * Each SimVoter has a voter component.
 * The voter component is a VoterCircle, for now.
 * This voter component is common to all simulations.
 * An example of a SimVoter is a GeoVoterBasis or a OneVoterCircle.
 * This is an inheritance structure.
 * @param {VoterCircle} voterCircle - a voter component that SimVoter builds upon.
 * @param {DraggableManager} dragm
 */
export default function SimVoter(voterCircle, dragm) {
    const self = this
    self.voter = voterCircle

    dragm.newCircleHandle(voterCircle, voterCircle.circle)

    self.renderForeground = () => {
        self.voter.renderForeground()
    }
}
