import TWEEN from './lib/tween.esm.js'

export default function Square(x,y,w,h,ctx,pixelRatio,dm) {
    let self = this
    // x y coordinates, width and height, all private variables
    self.x = x
    self.y = y
    self.w = w
    self.h = h

    // draggable component
    // register with draggable manager
    dm.newSquare(self)

    self.pickUp = function() {
        self.tweenSq = new TWEEN.Tween(self)
        self.tweenSq.to({w:21,h:21},100)
        self.tweenSq.start()
    }
    self.drop = function() {
        self.tweenSq = new TWEEN.Tween(self)
        self.tweenSq.to({w:11,h:11},100)
        self.tweenSq.start()
    }

    // graphics component
    self.render = function() {
        if (self.tweenSq) {
            self.tweenSq.update()
        }
        ctx.beginPath()
        ctx.fillStyle = "grey"
        ctx.rect((self.x-.5*self.w)*pixelRatio-.5,(self.y-.5*self.h)*pixelRatio-.5,self.w*pixelRatio+1,self.h*pixelRatio+1)
        ctx.fill()    
    }

}
