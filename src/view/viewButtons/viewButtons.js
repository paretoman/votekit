import menuSimOptions from './menuSimOptions.js'
import menuElectionOptions from './menuElectionOptions.js'
import addUndo from './addUndo.js'
import addSimControlsLabel from './addSimControlsLabel.js'
import buttonsToAddEntities from './buttonsToAddEntities.js'
import Menu from '../menu/Menu.js'
/**
 * Make buttons for the sandbox.
 * @param {*} sim
 * @param {*} layout
 * @param {*} viewMode
 */
export default function viewButtons(sim, layout, viewMode) {
    const {
        commander, simOptions, electionOptions, entities, changes,
    } = sim

    const menu = new Menu(changes, layout, commander)
    menuSimOptions(simOptions, menu)
    menuElectionOptions(electionOptions, menu)

    addUndo(layout, commander)
    addSimControlsLabel(layout)

    buttonsToAddEntities(viewMode, entities, layout)
    return { menu }
}
