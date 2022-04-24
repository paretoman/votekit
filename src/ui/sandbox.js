/** @module */

import Changes from './Changes.js'
import Screen from './Screen.js'
import addSVGOutput from './addSVGOutput.js'
import Menu from '../menu/Menu.js'
import Sim from '../sim/Sim.js'
import Layout from './Layout.js'
import Commander from '../command/Commander.js'
import addUndo from '../command/addUndo.js'
import addSaveConfigToText from '../command/addSaveConfigToText.js'
import addLoadConfigText from '../command/loadConfigText.js'
import addSaveConfigToLink from '../command/addSaveConfigToLink.js'

/**
 * Set up a user interface to run a simulation.
 * @param {Object} config - An object containing commands. A command is a {name,value} pair.
 */
export default function sandbox(config, comMessenger, sandboxURL) {
    // manage dependent calculations because we only want to do calculations if we need to
    const changes = new Changes()

    const layout = new Layout([
        'menu',
        'simControlsLabel',
        'addVoter',
        'addCandidate',
        'addCandidateDistribution',
        'undo',
        'redo',
        'screenWrap',
        'maps',
        'saveConfigToLink',
        'saveConfigToText',
        'loadConfigText',
        'svgUIDiv',
    ])

    const commander = new Commander(comMessenger)

    const menu = new Menu(changes, layout, commander)

    addUndo(layout, commander)

    addSaveConfigToLink(layout, commander, sandboxURL)

    addSaveConfigToText(layout, commander)

    addLoadConfigText(layout, commander)

    const screen = new Screen(300, 300, layout)

    addSVGOutput(screen, draw, layout)

    const sim = new Sim(screen, menu, changes, commander, layout)

    commander.loadConfig(config)
    commander.clearHistory()

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
        screen.clearMaps()
        screen.clearForeground()
        sim.render()
        sim.renderForeground()
    }
}
