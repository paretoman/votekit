import CircleGraphic from './CircleGraphic.js'

export default function SimVoterCircle(x, y, r, screen, dragm, election) {
    // VoterCircle for simulations of many candidates
    // VoterCircle class with Handle component to take care of dragging.

    const self = this

    self.x = x
    self.y = y
    self.r = r

    const circle = new CircleGraphic(self, 10, '#555', screen)
    self.circle = circle

    dragm.newCircleHandle(self, circle)

    election.newVoterGroup(self)

    self.update = function () {
    }

    // Graphics component
    self.render = function () {
        const { ctx } = screen
        // circle
        ctx.beginPath()
        // ctx.fillStyle = "#eee"
        ctx.arc(self.x, self.y, self.r, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()

        // handle
        circle.render()
    }
}
