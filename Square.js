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

    // graphics component
    self.render = function() {
        ctx.beginPath()
        ctx.fillStyle = "black"
        ctx.rect((self.x-.5*self.w)*pixelRatio-.5,(self.y-.5*self.h)*pixelRatio-.5,self.w*pixelRatio+1,self.h*pixelRatio+1)
        ctx.fill()    
    }

}
