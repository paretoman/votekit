import layoutOrder from './layoutOrder.js'
import Layout from './Layout.js'
import Menu from '../menu/Menu.js'
import menuSimOptions from './MenuSimOptions.js'
import menuElectionOptions from './menuElectionOptions.js'
import ViewStateMachine from './ViewStateMachine.js'
import buttonsToAddEntities from './buttonsToAddEntities.js'
import viewScreens from '../viewScreens/viewScreens.js'
import addUndo from '../command/addUndo.js'
import addSaveConfigToText from '../command/addSaveConfigToText.js'
import addLoadConfigText from '../command/loadConfigText.js'
import addSaveConfigToLink from '../command/addSaveConfigToLink.js'
import addSimControlsLabel from './addSimControlsLabel.js'

export default function View(sim, sandboxURL) {
    const {
        changes, commander, simOptions, electionOptions, entities, simMode, pub,
    } = sim

    const layout = new Layout(layoutOrder)
    const menu = new Menu(changes, layout, commander)

    menuSimOptions(simOptions, menu)
    menuElectionOptions(electionOptions, menu)

    const viewSM = new ViewStateMachine(pub, simMode, simOptions, changes)

    buttonsToAddEntities(viewSM, entities, layout)

    viewScreens(sim, viewSM, menu, layout)

    addUndo(layout, commander)
    addSaveConfigToLink(layout, commander, sandboxURL)
    addSaveConfigToText(layout, commander)
    addLoadConfigText(layout, commander)
    addSimControlsLabel(layout)

    const div = layout.makeComponent()

    return { div }
}
