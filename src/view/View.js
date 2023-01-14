import layoutOrder from './layoutOrder.js'
import Layout from './Layout.js'
import Menu from '../menu/Menu.js'
import ViewMode from './ViewMode.js'
import viewScreens from '../viewScreens/viewScreens.js'
import viewButtons from '../viewButtons/viewButtons.js'

/**
 * View observes the sim and adds a user interface.
 * The foreground draws animations.
 * The view loops as fast as the browser can refresh.
 * @param {*} sim
 * @param {String} sandboxURL
 * @returns
 */
export default function View(sim, sandboxURL) {
    const {
        changes, commander, simOptions, pub, update,
    } = sim

    const layout = new Layout(layoutOrder)
    const menu = new Menu(changes, layout, commander)
    const viewMode = new ViewMode(pub, simOptions, changes)

    viewButtons(sim, sandboxURL, layout, menu, viewMode)
    const { screenMain } = viewScreens(sim, viewMode, menu, layout)

    window.requestAnimationFrame(viewLoop)

    function viewLoop() {
        update()
        drawForeground()
        window.requestAnimationFrame(viewLoop)
    }

    function drawForeground() {
        if (screenMain.tweenGroup.getAll().length === 0) return
        screenMain.tweenGroup.update()
        viewMode.clearForeground()
        viewMode.renderForeground()
    }

    const div = layout.makeComponent()

    return { div }
}
