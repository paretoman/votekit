import menuSimOptions from './menuSimOptions.js'
import menuElectionOptions from './menuElectionOptions.js'
import addUndo from './addUndo.js'
import addSimControlsLabel from './addSimControlsLabel.js'
import buttonsToAddEntities from './buttonsToAddEntities.js'
import Menu from '../menu/Menu.js'
import addResultsPhaseSelector from '../viewScreens/addResultsPhaseSelector.js'
import addWarning from './addWarning.js'
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

    addResultsPhaseSelector(simOptions, pub, layout, changes, electionOptionsMan)

    addUndo(layout, commander)
    addSimControlsLabel(layout)

    buttonsToAddEntities(viewMode, entities, layout)

    addWarning(electionOptionsMan, viewMode, layout)

    return { menu }
}
