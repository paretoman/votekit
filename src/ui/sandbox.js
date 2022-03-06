/** @module */

import Changes from './Changes.js'
import Screen from './Screen.js'
import addSVGOutput from './addSVGOutput.js'
import Menu from '../menu/Menu.js'
import Election from '../election/Election.js'
import Sim from '../sim/Sim.js'
import SampleElections from '../election/SampleElections.js'
import GeoElection from '../election/GeoElection.js'
import Layout from './Layout.js'
import OneElection from '../election/OneElection.js'
import Commander from './Commander.js'
import addUndo from './addUndo.js'

/**
 * Set up a user interface to run a simulation.
 * @param {Object} config - An object containing commands. A command is a {name,value} pair.
 */
export default function sandbox(config) {
    // manage dependent calculations because we only want to do calculations if we need to
    const changes = new Changes()

    const layout = new Layout([
        'menu',
        'addVoter',
        'addCandidate',
        'addCandidateDistribution',
        'undo',
        'screen',
        'foreground',
        'geoMaps',
        'svgUIDiv',
    ])

    const commander = new Commander()

    const menu = new Menu(changes, layout, commander)

    addUndo(layout, commander)

    const screen = new Screen(300, 300, layout)

    addSVGOutput(screen, draw, layout)

    const election = new Election(menu)

    const oneElection = new OneElection(screen, menu, election)

    const sampleElections = new SampleElections(screen, menu, election)

    const geoElection = new GeoElection(screen, menu, election)

    // eslint-disable-next-line max-len
    const sim = new Sim(screen, menu, changes, oneElection, sampleElections, geoElection, commander, layout)

    commander.loadConfig(config)

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
