
import DraggableManager from './DraggableManager.js'
import Screen from './Screen.js'
import addSVGOutput from './addSVGOutput.js'
import SimVoterCircle from './SimVoterCircle.js'
import SimVoteManager from './SimVoteManager.js'
import CandidateDistribution from './CandidateDistribution.js'

export default function sandbox(config) {
    // sandbox for simulation of many 

    // make a canvas
    let screen = new Screen(config.idScript,600,600)
    addSVGOutput(screen,draw)
    
    let changes = ["init"] // manage dependent calculations because we only want to do calculations if we need to
    
    let dragm = new DraggableManager( screen, changes)

    let simVotem = new SimVoteManager(screen)

    let cd = new CandidateDistribution( 300, 300, 400 ,screen,dragm,simVotem)
    let ci = new SimVoterCircle( 100, 300, 200 ,screen,dragm,simVotem)
    let ci2 = new SimVoterCircle( 500, 300, 200 ,screen,dragm,simVotem)

    window.requestAnimationFrame(gameLoop);
    
    function gameLoop() {
        update()
        draw();
        window.requestAnimationFrame(gameLoop);
    }

    function update() {
        if (changes.length === 0) {
            simVotem.addSim()
            return
        }
         // clear changes, reset to []
        changes.splice(0,changes.length)
        simVotem.startSim()
        ci.update()
        ci2.update()
    }

    function draw() {
        screen.clear()
        simVotem.render()
        ci.render()
        ci2.render()
        cd.render()
    }
    
}
