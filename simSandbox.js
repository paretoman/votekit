import DraggableManager from './DraggableManager.js'
import Screen from './Screen.js'
import addSVGOutput from './addSVGOutput.js'
import SimVoterCircle from './SimVoterCircle.js'
import SimElections from './SimElections.js'
import CandidateDistribution from './CandidateDistribution.js'

export default function sandbox(config) {
    // sandbox for simulation of many

    // make a canvas
    const screen = new Screen(config.idScript, 600, 600)
    addSVGOutput(screen, draw)

    const changes = ['init'] // manage dependent calculations because we only want to do calculations if we need to

    const dragm = new DraggableManager(screen, changes)

    const simElections = new SimElections(screen)

    const cd = new CandidateDistribution(300, 300, 400, screen, dragm, simElections)
    const ci = new SimVoterCircle(100, 300, 200, screen, dragm, simElections)
    const ci2 = new SimVoterCircle(500, 300, 200, screen, dragm, simElections)

    window.requestAnimationFrame(gameLoop)

    function gameLoop() {
        update()
        draw()
        window.requestAnimationFrame(gameLoop)
    }

    function update() {
        if (changes.length === 0) {
            simElections.addSim()
            return
        }
        // clear changes, reset to []
        changes.splice(0, changes.length)
        simElections.startSim()
        ci.update()
        ci2.update()
    }

    function draw() {
        screen.clear()
        simElections.render()
        ci.render()
        ci2.render()
        cd.render()
    }
}
