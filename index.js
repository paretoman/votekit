import getPixelRatio from './screen.js'
import DraggableManager from './DraggableManager.js'
import Square from './Square.js'

window.onload = function () {
    let canvas = document.getElementById("a");//document.querySelector("canvas")
    let ctx = canvas.getContext("2d")
    let pixelRatio = getPixelRatio(ctx)
    canvas.width = 600 * pixelRatio
    canvas.height = 600 * pixelRatio
    let changes = []
    let dm = new DraggableManager(canvas,changes)
    let sq = new Square(10,10,11,11,ctx,pixelRatio,dm)
    window.requestAnimationFrame(gameLoop);

    function gameLoop() {
        draw();
        window.requestAnimationFrame(gameLoop);
    }

    function draw() {
        ctx.clearRect(0,0,600*pixelRatio,600*pixelRatio);
        sq.render()
    }
}