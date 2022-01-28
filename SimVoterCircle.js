import Handle from './Handle.js'

export default function SimVoterCircle(x, y, r, screen, dragm, election) {
    // VoterCircle for simulations of many candidates
    // VoterCircle class with Handle component to take care of dragging.

    const self = this

    self.r = r

    const handle = new Handle(x, y, screen, dragm)
    self.handle = handle

    election.newVoterGroup(self)

    self.update = function () {
    }

    // Graphics component
    self.render = function () {
        const { ctx } = screen
        // circle
        ctx.beginPath()
        // ctx.fillStyle = "#eee"
        ctx.arc(handle.x, handle.y, self.r, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()

        // handle
        handle.render()
    }
}
