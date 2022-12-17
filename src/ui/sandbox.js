/** @module */

import Changes from '../sim/Changes.js'
import Menu from '../menu/Menu.js'
import Sim from '../sim/Sim.js'
import Layout from './Layout.js'
import Commander from '../command/Commander.js'
import addUndo from '../command/addUndo.js'
import addSaveConfigToText from '../command/addSaveConfigToText.js'
import addLoadConfigText from '../command/loadConfigText.js'
import addSaveConfigToLink from '../command/addSaveConfigToLink.js'
import * as TWEEN from '../lib/snowpack/build/snowpack/pkg/@tweenjs/tweenjs.js'
import menuSim from '../sim/menuSim.js'
import Entities from '../sim/Entities.js'
import ViewStateMachine from '../view/ViewStateMachine.js'
import sandboxScreenViews from './sandboxScreenViews.js'
import layoutOrder from './layoutOrder.js'

/**
 * Set up a user interface to run a simulation.
 * @param {Object} config - An object containing commands. A command is a {name,value} pair.
 */
export default function sandbox(config, comMessenger, sandboxURL) {
    // manage dependent calculations because we only want to do calculations if we need to
    const changes = new Changes()

    const layout = new Layout(layoutOrder)

    const commander = new Commander(comMessenger)
    addUndo(layout, commander)
    addSaveConfigToLink(layout, commander, sandboxURL)
    addSaveConfigToText(layout, commander)
    addLoadConfigText(layout, commander)

    const menu = new Menu(changes, layout, commander)

    const entities = new Entities(menu, changes, commander, layout)
    const sim = new Sim(entities, menu, changes)
    menuSim(sim, menu, layout)

    // View Screens
    const viewSM = new ViewStateMachine(sim)
    sandboxScreenViews(viewSM, entities, sim, changes, menu, layout)

    // Default Entities
    entities.candidateList.addCandidate({ x: 50, y: 100 }, { x: 50 }, '#e05020', true)
    entities.candidateList.addCandidate({ x: 100, y: 50 }, { x: 100 }, '#50e020', true)
    entities.candidateList.addCandidate({ x: 300 - 100, y: 300 - 50 }, { x: 200 }, '#2050e0', true)
    entities.candidateDnList.addCandidateDistribution({ x: 150, y: 150, w: 200 }, { x: 150, w: 200, densityProfile: 'gaussian' }, true)
    entities.voterShapeList.addVoterCircle({ x: 50, y: 150, w: 200 }, { x: 50, w: 200, densityProfile: 'gaussian' }, true)
    entities.voterShapeList.addVoterCircle({ x: 250, y: 150, w: 200 }, { x: 250, w: 200, densityProfile: 'gaussian' }, true)

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
        viewSM.clearForeground()
        viewSM.renderForeground()
    }
}
