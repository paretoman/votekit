/* eslint-disable no-new */
/** @module */

import Changes from '../sim/Changes.js'
import Screen from './Screen.js'
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
import ViewSettings from '../view/ViewSettings.js'
import menuSim from '../sim/menuSim.js'
import Entities from '../sim/Entities.js'
import ViewJupyter from '../environments/ViewJupyter.js'
import ViewVizBudget from '../view/ViewVizBudget.js'
import ViewVizOne from '../view/ViewVizOne.js'
import ViewVizSample from '../view/ViewVizSample.js'
import ViewGeoMaps from '../view/ViewGeoMaps.js'
import ViewOne from '../view/ViewOne.js'
import ViewSample from '../view/ViewSample.js'
import ScreenCommon from './ScreenCommon.js'
import addSvgSwitch from './addSvgSwitch.js'
import addDownloadScreen from './addDownloadScreen.js'
import ViewStateMachine from '../view/ViewStateMachine.js'

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
        'viz',
        'vizMini',
        'maps',
        'budget',
        'saveConfigToLink',
        'saveConfigToText',
        'loadConfigText',
        'svgMainDiv',
        'svgMiniDiv',
        'svgMaps',
        'svgBudget',
        'svgSwitch',
        'showDownloadScreenLink',
    ])

    const commander = new Commander(comMessenger)

    const menu = new Menu(changes, layout, commander)

    addUndo(layout, commander)

    addSaveConfigToLink(layout, commander, sandboxURL)

    addSaveConfigToText(layout, commander)

    addLoadConfigText(layout, commander)

    const entities = new Entities(menu, changes, commander, layout)
    const sim = new Sim(entities, menu, changes)
    menuSim(sim, menu, layout)

    const view = new ViewStateMachine(sim)
    const screenCommon = new ScreenCommon(300, 300)
    const screenMain = new Screen(screenCommon, view, layout, 'viz')
    const screenMini = new Screen(screenCommon, view, layout, 'vizMini')
    screenMini.setHeight(screenCommon.height / 3)
    screenMini.hide()

    addSvgSwitch(screenCommon, layout, view)

    addDownloadScreen(screenCommon, layout)

    addDarkModeSwitch(screenCommon, layout, view)
    const viewSettings = new ViewSettings(changes)
    new ViewOne(entities, screenMain, menu, changes, sim, view, viewSettings)
    new ViewSample(entities, screenMain, menu, changes, sim, view, viewSettings)
    new ViewJupyter(sim, view, changes)
    new ViewVizOne(entities, screenMain, screenMini, menu, changes, sim, view, viewSettings)
    new ViewVizSample(entities, screenMain, menu, changes, sim, view, viewSettings)
    new ViewVizBudget(screenCommon, layout, menu, changes, sim, view)
    new ViewGeoMaps(entities, screenCommon, layout, changes, sim, view)

    // Default Entities //
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
        view.clearForeground()
        view.renderForeground()
    }
}
