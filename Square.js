import TWEEN from './lib/tween.esm.js'

export default function Square(x,y,w,h,color,ctx,dragm) {
    let self = this
    // x y coordinates, width and height, all private variables
    self.x = x
    self.y = y
    self.w = w // display width, because we're going to make animations with it
    self.h = h
    self.trueW = w // true width, because we want to return to this width after animating.
    self.trueH = h
    self.color = color

    // draggable component
    // register with draggable manager
    dragm.newSquare(self)

    self.pickUp = function() {
        self.tweenSq = new TWEEN.Tween(self)
        self.tweenSq.to({w:self.trueW+10,h:self.trueH+10},100)
        self.tweenSq.start()
    }
    self.drop = function() {
        self.tweenSq = new TWEEN.Tween(self)
        self.tweenSq.to({w:self.trueW,h:self.trueH},100)
        self.tweenSq.start()
    }

    // Graphics component
    self.render = function() {
        if (self.tweenSq) {
            self.tweenSq.update()
        }
        ctx.beginPath()
        ctx.fillStyle = self.color
        ctx.rect((self.x-.5*self.w)-.5,(self.y-.5*self.h)-.5,self.w+1,self.h+1)
        ctx.fill()    
    }

}
