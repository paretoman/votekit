import DraggableManager from './DraggableManager.js'
import Screen from './Screen.js'
import addSVGOutput from './addSVGOutput.js'
import VoterCircle from './VoterCircle.js'
import Election from './Election.js'
import Candidate from './Candidate.js'
import Menu from './Menu.js'

export default function sandbox(config) {
    // make a canvas

    const changes = ['init'] // manage dependent calculations because we only want to do calculations if we need to

    const menu = new Menu(config.idScript, changes)

    const screen = new Screen(config.idScript, 600, 600)
    addSVGOutput(screen, draw)

    const dragm = new DraggableManager(screen, changes)

    const election = new Election(menu)

    const sq = new Candidate(100, 200, 21, 21, '#e52', screen, dragm, election)
    const sq2 = new Candidate(200, 100, 21, 21, '#5e2', screen, dragm, election)
    const sq3 = new Candidate(600 - 200, 600 - 100, 21, 21, '#25e', screen, dragm, election)
    const ci = new VoterCircle(100, 300, 200, screen, dragm, election)
    const ci2 = new VoterCircle(500, 300, 200, screen, dragm, election)

    window.requestAnimationFrame(gameLoop)

    function gameLoop() {
        update()
        draw()
        window.requestAnimationFrame(gameLoop)
    }

    function update() {
        if (changes.length === 0) return
        // clear changes, reset to []
        changes.splice(0, changes.length)
        election.updateTallies()
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
