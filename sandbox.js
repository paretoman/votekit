
import DraggableManager from './DraggableManager.js'
import Square from './Square.js'
import Screen from './Screen.js'

export default function sandbox(config) {

    // make a canvas
    let screen = new Screen(config.idScript,600,600)
    
    let changes = [] // manage dependent calculations because we only want to do calculations if we need to
    let dragm = new DraggableManager( screen.canvas, changes)
    let sq = new Square(10,10,11,11,screen.ctx,dragm)


    window.requestAnimationFrame(gameLoop);
    
    function gameLoop() {
        draw();
        window.requestAnimationFrame(gameLoop);
    }

    function draw() {
        screen.ctx.clearRect(0,0,screen.canvas.width,screen.canvas.height);
        sq.render()
    }
}