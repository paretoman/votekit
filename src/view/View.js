import layoutOrder from '../ui/layoutOrder.js'
import Layout from '../ui/Layout.js'
import Menu from '../menu/Menu.js'
import menuSimOptions from './MenuSimOptions.js'
import menuElectionOptions from './menuElectionOptions.js'
import sandboxScreenViews from '../ui/sandboxScreenViews.js'

import addUndo from '../command/addUndo.js'
import addSaveConfigToText from '../command/addSaveConfigToText.js'
import addLoadConfigText from '../command/loadConfigText.js'
import addSaveConfigToLink from '../command/addSaveConfigToLink.js'
import addSimControlsLabel from '../sim/addSimControlsLabel.js'

export default function View(sim, sandboxURL) {
    const {
        changes, commander, simOptions, electionOptions, entities, simMachine,
    } = sim

    const layout = new Layout(layoutOrder)
    const menu = new Menu(changes, layout, commander)

    menuSimOptions(simOptions, menu)
    menuElectionOptions(electionOptions, menu)

    sandboxScreenViews(simMachine, entities, simOptions, electionOptions, changes, menu, layout)

    addUndo(layout, commander)
    addSaveConfigToLink(layout, commander, sandboxURL)
    addSaveConfigToText(layout, commander)
    addLoadConfigText(layout, commander)
    addSimControlsLabel(layout)

    const div = layout.makeComponent()

    return { div }
}
