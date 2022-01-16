import getPixelRatio from './screen.js'

window.onload = function () {
    let canvas = document.getElementById("a");//document.querySelector("canvas")
    let ctx = canvas.getContext("2d")
    let pixelRatio = getPixelRatio(ctx)
    canvas.width = 600 * pixelRatio
    canvas.height = 600 * pixelRatio
    let sq = new Square(10,10,10,10,ctx,pixelRatio)
    sq.render()
}

function Square(x,y,w,h,ctx,pixelRatio) {
    self = this
    // x y coordinates, width and height, all private variables

    // draggable component


    // graphics component
    self.render = function() {
        ctx.beginPath()
        ctx.fillStyle = "black"
        ctx.rect(x*pixelRatio+.5,y*pixelRatio+.5,w*pixelRatio+.5,h*pixelRatio+.5)
        ctx.fill()    
    }

}