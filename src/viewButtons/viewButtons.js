import menuSimOptions from './MenuSimOptions.js'
import menuElectionOptions from './menuElectionOptions.js'
import addUndo from '../command/addUndo.js'
import addSaveConfigToText from '../save/addSaveConfigToText.js'
import addLoadConfigText from '../save/loadConfigText.js'
import addSaveConfigToLink from '../save/addSaveConfigToLink.js'
import addSimControlsLabel from './addSimControlsLabel.js'
import buttonsToAddEntities from './buttonsToAddEntities.js'
import addSaveConfigToShortLink from '../save/addSaveConfigToShortLink.js'
/**
 * Make buttons for the sandbox.
 * @param {*} sim
 * @param {*} sandboxURL
 * @param {*} layout
 * @param {*} menu
 * @param {*} viewMode
 */
export default function viewButtons(sim, sandboxURL, layout, menu, viewMode) {
    const {
        commander, simOptions, electionOptions, entities,
    } = sim

    menuSimOptions(simOptions, menu)
    menuElectionOptions(electionOptions, menu)

    addUndo(layout, commander)
    addSaveConfigToLink(layout, commander, sandboxURL)
    addSaveConfigToShortLink(layout, commander, sandboxURL)
    addSaveConfigToText(layout, commander)
    addLoadConfigText(layout, commander)
    addSimControlsLabel(layout)

    buttonsToAddEntities(viewMode, entities, layout)
}
