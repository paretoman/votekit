import SquareGraphic from './SquareGraphic.js'

export default function CandidateDistribution(x, y, r, screen, dragm, election) {
    // This represents a spatial distribution of candidates.
    // A draggable handle handle provides draggable behavior.

    const self = this

    self.x = x
    self.y = y
    self.r = r

    const square = new SquareGraphic(self, 10, 10, '#ccc', screen) // square is for rendering
    self.square = square

    dragm.newSquareHandle(self, square)

    election.newCandidateDistribution(self)

    self.render = function () {
        const { ctx } = screen

        ctx.beginPath()
        // ctx.fillStyle = "grey"
        ctx.arc(self.x, self.y, self.r, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()

        square.render()
    }
}
