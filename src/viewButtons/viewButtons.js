import menuSimOptions from './MenuSimOptions.js'
import menuElectionOptions from './menuElectionOptions.js'
import addUndo from '../command/addUndo.js'
import addSaveConfigToText from '../save/addSaveConfigToText.js'
import addLoadConfigText from '../save/addLoadConfigText.js'
import addSaveConfigToLink from '../save/addSaveConfigToLink.js'
import addSimControlsLabel from './addSimControlsLabel.js'
import buttonsToAddEntities from './buttonsToAddEntities.js'
import addSaveConfigToShortLink from '../save/addSaveConfigToShortLink.js'
import addName from '../save/addName.js'
/**
 * Make buttons for the sandbox.
 * @param {*} sim
 * @param {*} sandboxPath
 * @param {*} layout
 * @param {*} menu
 * @param {*} viewMode
 */
export default function viewButtons(sim, sandboxPath, layout, menu, viewMode) {
    const {
        commander, simOptions, electionOptions, entities,
    } = sim

    menuSimOptions(simOptions, menu)
    menuElectionOptions(electionOptions, menu)

    addUndo(layout, commander)
    const nameInput = addName(layout)
    addSaveConfigToLink(layout, commander, sandboxPath, nameInput)
    addSaveConfigToShortLink(layout, commander, sandboxPath, nameInput)
    addSaveConfigToText(layout, commander, nameInput)
    addLoadConfigText(layout, commander, nameInput)
    addSimControlsLabel(layout)

    buttonsToAddEntities(viewMode, entities, layout)
    return { nameInput }
}
