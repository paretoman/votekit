/** @module */

import Changes from './Changes.js'
import DraggableManager from './DraggableManager.js'
import Screen from './Screen.js'
import addSVGOutput from './addSVGOutput.js'
import Menu from '../menu/Menu.js'
import Election from '../election/Election.js'
import Sim from '../sim/Sim.js'
import SampleElections from '../election/SampleElections.js'
import GeoElection from '../election/GeoElection.js'
import Layout from './Layout.js'
import OneElection from '../election/OneElection.js'

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

    const layout = new Layout(['menu', 'screen', 'foreground', 'svgUIDiv'])

    const menu = new Menu(changes, layout)

    const screen = new Screen(600, 600, layout)

    addSVGOutput(screen, draw, layout)

    const dragm = new DraggableManager(screen, changes)

    const election = new Election(menu)

    const oneElection = new OneElection(screen, menu, election)

    const sampleElections = new SampleElections(screen, menu, election)

    const geoElection = new GeoElection(screen, menu, election)

    // eslint-disable-next-line max-len
    const sim = new Sim(screen, dragm, menu, changes, election, oneElection, sampleElections, geoElection, initialState)

    const div = layout.makeComponent()

    window.requestAnimationFrame(gameLoop)

    return div

    function gameLoop() {
        update()
        drawForeground()
        window.requestAnimationFrame(gameLoop)
    }

    function update() {
        sim.update()
    }

    function drawForeground() {
        screen.clearForeground()
        sim.renderForeground()
    }

    function draw() {
        screen.clear()
        sim.render()
        sim.renderForeground()
    }
}
