
import DraggableManager from './DraggableManager.js'
import Screen, {addSVGOutput} from './Screen.js'
import VoterCircle from './VoterCircle.js'
import VoteManager from './VoteManager.js'
import Candidate from './Candidate.js'

export default function sandbox(config) {

    // make a canvas
    let screen = new Screen(config.idScript,600,600)
    addSVGOutput(screen,draw)
    
    let changes = ["init"] // manage dependent calculations because we only want to do calculations if we need to
    
    let dragm = new DraggableManager( screen, changes)

    let votem = new VoteManager(screen)

    let sq = new Candidate(100,200,21,21,"#e52",screen,dragm,votem)
    let sq2 = new Candidate(200,100,21,21,"#5e2",screen,dragm,votem)
    let sq3 = new Candidate(600-200,600-100,21,21,"#25e",screen,dragm,votem)
    let ci = new VoterCircle( 100, 300, 200 ,screen,dragm,votem)
    let ci2 = new VoterCircle( 500, 300, 200 ,screen,dragm,votem)


    window.requestAnimationFrame(gameLoop);
    
    function gameLoop() {
        update()
        draw();
        window.requestAnimationFrame(gameLoop);
    }

    function update() {
        if (changes.length === 0) return
         // clear changes, reset to []
        changes.splice(0,changes.length)
        votem.vote()
        ci.update()
        ci2.update()
    }

    function draw() {
        screen.clear()
        ci.render()
        ci2.render()
        sq.render()
        sq2.render()
        sq3.render()
    }
    
}
