/** @module */

import Changes from '../sim/Changes.js'
import Menu from '../menu/Menu.js'
import SimStateMachine from '../sim/SimStateMachine.js'
import Layout from './Layout.js'
import Commander from '../command/Commander.js'
import addUndo from '../command/addUndo.js'
import addSaveConfigToText from '../command/addSaveConfigToText.js'
import addLoadConfigText from '../command/loadConfigText.js'
import addSaveConfigToLink from '../command/addSaveConfigToLink.js'
import Entities from '../sim/Entities.js'
import sandboxScreenViews from './sandboxScreenViews.js'
import layoutOrder from './layoutOrder.js'
import addSimControlsLabel from '../sim/addSimControlsLabel.js'
import SimOptions from '../sim/SimOptions.js'
import ElectionOptions from '../election/ElectionOptions.js'
import VoterDistricts from '../voters/VoterDistricts.js'
import addDefaultEntities from './addDefaultEntities.js'
import menuSimOptions from '../view/MenuSimOptions.js'
import menuElectionOptions from '../view/menuElectionOptions.js'

/**
 * Set up a user interface to run a simulation.
 * @param {Object} config - An object containing commands. A command is a {name,value} pair.
 */
export default function sandbox(config, comMessenger, sandboxURL) {
    // Sim //

    const changes = new Changes()

    const commander = new Commander(comMessenger)

    const simOptions = new SimOptions(changes)
    const electionOptions = new ElectionOptions(changes, simOptions)

    const entities = new Entities(changes, commander)
    const voterDistricts = new VoterDistricts(entities.voterShapeList, changes)
    const simMachine = new SimStateMachine(entities, voterDistricts, changes, simOptions, electionOptions)
    window.requestAnimationFrame(simLoop)
    function simLoop() {
        simMachine.update()
        window.requestAnimationFrame(simLoop)
    }

    // View //

    const layout = new Layout(layoutOrder)
    const menu = new Menu(changes, layout, commander)

    menuSimOptions(simOptions, menu)
    menuElectionOptions(electionOptions, menu)

    sandboxScreenViews(simMachine, entities, simOptions, electionOptions, changes, menu, layout)

    addDefaultEntities(entities)

    commander.loadConfig(config)
    commander.clearHistory()

    addUndo(layout, commander)
    addSaveConfigToLink(layout, commander, sandboxURL)
    addSaveConfigToText(layout, commander)
    addLoadConfigText(layout, commander)
    addSimControlsLabel(layout)

    const div = layout.makeComponent()
    return div
}
