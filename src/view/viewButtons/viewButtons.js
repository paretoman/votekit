import menuSimOptions from './menuSimOptions.js'
import menuElectionOptions from './menuElectionOptions.js'
import addUndo from './addUndo.js'
import addSimControlsLabel from './addSimControlsLabel.js'
import buttonsToAddEntities from './buttonsToAddEntities.js'
import Menu from '../menu/Menu.js'
import buttonsForSeeds from './buttonsForSeeds.js'
/**
 * Make buttons for the sandbox.
 * @param {*} sim
 * @param {*} layout
 * @param {*} viewMode
 */
export default function viewButtons(sim, layout, viewMode) {
    const {
        commander, simOptions, electionOptionsMan, entities, changes, pub,
    } = sim

    const menu = new Menu(pub, changes, layout)
    menuSimOptions(simOptions, menu)
    menuElectionOptions(electionOptionsMan, menu)

    addUndo(layout, commander)
    addSimControlsLabel(layout)

    buttonsToAddEntities(viewMode, entities, layout)
    buttonsForSeeds(viewMode, simOptions, layout)
    return { menu }
}
