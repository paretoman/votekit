import Handle from './Handle.js'
import VoronoiGroup from './VoronoiGroup.js'

export default function VoterCircle(x, y, r, screen, dragm, election) {
    // VoterCircle class with Handle component to take care of dragging.
    // VoronoiGroup component takes care of drawing votes.

    const self = this

    self.r = r

    const handle = new Handle(x, y, screen, dragm)
    self.handle = handle

    election.newVoterGroup(self)

    const voronoiGroup = new VoronoiGroup(election, self, screen)

    self.update = function () {
        voronoiGroup.update()
    }

    // Graphics component
    self.render = function () {
        // circle
        voronoiGroup.render()
        // handle
        handle.render()
    }
}
