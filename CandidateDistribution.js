import Square from './Square.js'

export default function CandidateDistribution(x, y, r, screen, dragm, votem) {
    // This represents a spatial distribution of candidates.
    // A draggable square handle provides draggable behavior.

    const self = this

    self.r = r

    const square = new Square(x, y, 10, 10, '#ccc', screen, dragm)
    self.square = square

    votem.newCandidateDistribution(self)

    self.render = function () {
        const { ctx } = screen

        ctx.beginPath()
        // ctx.fillStyle = "grey"
        ctx.arc(square.x, square.y, self.r, 0, 2 * Math.PI)
        // ctx.fill()
        ctx.stroke()

        square.render()
    }
}
