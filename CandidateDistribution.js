import Square from './Square.js'
import { _drawStrokedColor, _textPercent } from './graphicsUtilities.js'

export default function CandidateDistribution(x,y,r,screen,dragm,votem) {
    // Candidate class on top of square. Candidate adds candidate behavior on top of a draggable square handle.
    
    let self = this

    self.r = r

    let square = new Square(x,y,10,10,"#ccc",screen,dragm)
    self.square = square

    votem.newCandidateDistribution(self)

    self.render = function() {
        let ctx = screen.ctx

        ctx.beginPath()
        // ctx.fillStyle = "grey"
        ctx.arc(square.x, square.y, self.r, 0, 2*3.14159)
        // ctx.fill()
        ctx.stroke()

        square.render()
        
    }
}
