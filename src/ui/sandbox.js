/** @module */

import Changes from './Changes.js'
import DraggableManager from './DraggableManager.js'
import Screen from './Screen.js'
import addSVGOutput from './addSVGOutput.js'
import Menu from '../menu/Menu.js'
import Election from '../election/Election.js'
import Sim from '../sim/Sim.js'
import SimElections from '../election/SimElections.js'
import divSandbox from './divSandbox.js'

/**
 * Set up a user interface to run a simulation.
 * @param {Object} config
 * @param {String} config.idScript - The id of an element.
 * We will append the user interface as a sibling.
 * @param {String} config.initialState - The game state of the simulation to load initially.
 */
export default function sandbox(config) {
    const { initialState } = config

    // manage dependent calculations because we only want to do calculations if we need to
    const changes = new Changes()

    const menu = new Menu(changes)

    const screen = new Screen(600, 600)

    const svgUIDiv = addSVGOutput(screen, draw)

    const dragm = new DraggableManager(screen, changes)

    const election = new Election(menu)

    const simElections = new SimElections(screen, menu, election)

    const sim = new Sim(screen, dragm, menu, changes, election, simElections, initialState)

    const div = divSandbox(menu, screen, svgUIDiv)

    window.requestAnimationFrame(gameLoop)

    return div

    function gameLoop() {
        update()
        draw()
        window.requestAnimationFrame(gameLoop)
    }

    function update() {
        sim.update()
    }

    function draw() {
        screen.clear()
        sim.render()
    }
}
