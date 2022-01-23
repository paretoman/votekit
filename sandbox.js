
import DraggableManager from './DraggableManager.js'
import Square from './Square.js'
import Screen from './Screen.js'
import CircleOfVoters from './CircleOfVoters.js'

export default function sandbox(config) {

    // make a canvas
    let screen = new Screen(config.idScript,600,600)
    
    let changes = [] // manage dependent calculations because we only want to do calculations if we need to
    let dragm = new DraggableManager( screen.canvas, changes)
    let sq = new Square(100,200,21,21,"#555",screen.ctx,dragm)
    let sq2 = new Square(200,100,21,21,"#555",screen.ctx,dragm)
    
    // Make a shape
    let ci_x = 300
    let ci_y = 300
    let ci_r = 200
    let ci = new CircleOfVoters( ci_x, ci_y, ci_r ,screen.ctx,dragm)

    window.requestAnimationFrame(gameLoop);
    
    function gameLoop() {
        draw();
        window.requestAnimationFrame(gameLoop);
    }

    function draw() {
        screen.ctx.clearRect(0,0,screen.canvas.width,screen.canvas.height);
        ci.render()
        sq.render()
        sq2.render()
    }
}