import layoutOrder from './layoutOrder.js'
import Layout from './Layout.js'
import Menu from '../menu/Menu.js'
import ViewMode from './ViewMode.js'
import viewScreens from '../viewScreens/viewScreens.js'
import viewButtons from '../viewButtons/viewButtons.js'
import Changes from '../sim/Changes.js'
import loadView from '../save/loadView.js'

/**
 * View observes the sim and adds a user interface.
 * The foreground draws animations.
 * The view loops as fast as the browser can refresh.
 * @param {*} sim
 * @param {String} sandboxPath
 * @returns
 */
export default function View(sim, sandboxPath) {
    const {
        changes, commander, simOptions, pub, update, init,
    } = sim

    const layout = new Layout(layoutOrder)
    const menu = new Menu(changes, layout, commander)
    const viewMode = new ViewMode(pub, simOptions, changes)
    const viewChanges = new Changes()

    viewButtons(sim, sandboxPath, layout, menu, viewMode)
    const { screenMain } = viewScreens(sim, viewMode, menu, layout, viewChanges)

    function load(configURL, targetConfig) {
        loadView(configURL, targetConfig, init)
    }

    window.requestAnimationFrame(viewLoop)

    function viewLoop() {
        update()
        drawForeground()
        window.requestAnimationFrame(viewLoop)
    }

    function drawForeground() {
        if (viewChanges.checkNone() && screenMain.tweenGroup.getAll().length === 0) return
        screenMain.tweenGroup.update()
        viewMode.clearForeground()
        viewMode.renderForeground()
    }

    const div = layout.makeComponent()

    return { div, load }
}
