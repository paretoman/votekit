import Square from './Square.js'

export default function Candidate(x,y,w,h,color,screen,dragm,votem) {
    // Candidate class on top of square. Candidate adds candidate behavior on top of a draggable square handle.
    
    let self = this

    let square = new Square(x,y,w,h,color,screen,dragm)
    self.square = square

    votem.newCandidate(self)

    self.render = function() {
        square.render()
        
        _drawStrokedColor(_textPercent(self.fraction),square.x,square.y-square.h*.5-2,20,2,"#222",screen.ctx)
    }
}

function _drawStrokedColor(text, x, y, textsize,lw, color, ctx, textAlign) {
	ctx.save()
	ctx.textAlign = textAlign || "center"
	ctx.font = textsize + "px Sans-serif"
	ctx.lineWidth = lw;
	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
	ctx.restore()
}

function _textPercent(f) {
	var a = (100 * f).toFixed(0)
	return a
}