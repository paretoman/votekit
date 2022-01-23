import TWEEN from './lib/tween.esm.js'

export default function CircleOfVoters(x, y, r ,ctx,dragm) {
    let self = this

    self.x = x
    self.y = y
    self.r = r
    self.handleSize = 10
    self.trueHandleSize = 10

    dragm.newHandle(self,self.handleSize)

    self.pickUp = function() {
        self.tween = new TWEEN.Tween(self)
        self.tween.to({handleSize:self.trueHandleSize*2},100)
        self.tween.start()
    }
    self.drop = function() {
        self.tween = new TWEEN.Tween(self)
        self.tween.to({handleSize:self.trueHandleSize},100)
        self.tween.start()
    }
    
    // Graphics component
    self.render = function() {
        if (self.tween) {
            self.tween.update()
        }
        // circle
        ctx.beginPath()
        ctx.fillStyle = "grey"
        ctx.arc(self.x, self.y, self.r, 0, 2*3.14159)
        ctx.fill()    
        // handle

        ctx.beginPath()
        ctx.fillStyle = "#555"
        ctx.arc(self.x, self.y, self.handleSize, 0, 2*3.14159)
        // let hs = self.handleSize
        // ctx.rect((self.x-.5*hs)-.5,(self.y-.5*hs)-.5,hs+1,hs+1)
        ctx.fill()   
    }

}