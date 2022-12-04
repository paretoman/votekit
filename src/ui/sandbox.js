/** @module */

import Changes from '../sim/Changes.js'
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
import * as TWEEN from '../lib/snowpack/build/snowpack/pkg/@tweenjs/tweenjs.js'
import addDarkModeSwitch from './addDarkModeSwitch.js'
import View from '../sim/View.js'
import menuSim from '../sim/menuSim.js'

/**
 * Set up a user interface to run a simulation.
 * @param {Object} config - An object containing commands. A command is a {name,value} pair.
 */
export default function sandbox(config, comMessenger, sandboxURL) {
    // manage dependent calculations because we only want to do calculations if we need to
    const changes = new Changes()

    const layout = new Layout([
        'menu',
        'darkModeSwitch',
        'simControlsLabel',
        'undo',
        'redo',
        'addVoter',
        'addCandidate',
        'addCandidateDistribution',
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

    addDarkModeSwitch(screen, draw, layout)
    const sim = new Sim(menu, changes, commander, layout)
    menuSim(sim, menu, layout)
    const view = new View(sim, screen, menu, changes, commander, layout)

    // Default Entities //
    sim.candidateList.addCandidate({ x: 50, y: 100 }, { x: 50 }, '#e05020', true)
    sim.candidateList.addCandidate({ x: 100, y: 50 }, { x: 100 }, '#50e020', true)
    sim.candidateList.addCandidate({ x: 300 - 100, y: 300 - 50 }, { x: 200 }, '#2050e0', true)
    sim.candidateDnList.addCandidateDistribution({ x: 150, y: 150, w: 200 }, { x: 150, w: 200, densityProfile: 'gaussian' }, true)
    sim.voterShapeList.addVoterCircle({ x: 50, y: 150, w: 200 }, { x: 50, w: 200, densityProfile: 'gaussian' }, true)
    sim.voterShapeList.addVoterCircle({ x: 250, y: 150, w: 200 }, { x: 250, w: 200, densityProfile: 'gaussian' }, true)

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
        TWEEN.update()
    }

    function drawForeground() {
        screen.clearForeground()
        view.renderForeground()
    }

    function draw() {
        screen.clear()
        screen.clearMaps()
        screen.clearForeground()
        view.render()
        view.renderForeground()
    }
}
