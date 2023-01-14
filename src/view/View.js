import layoutOrder from './layoutOrder.js'
import Layout from './Layout.js'
import Menu from '../menu/Menu.js'
import ViewState from './ViewState.js'
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
        changes, commander, simOptions, simMode, pub, update,
    } = sim

    const layout = new Layout(layoutOrder)
    const menu = new Menu(changes, layout, commander)
    const viewState = new ViewState(pub, simMode, simOptions, changes)

    viewButtons(sim, sandboxURL, layout, menu, viewState)
    const { screenMain } = viewScreens(sim, viewState, menu, layout)

    window.requestAnimationFrame(viewLoop)

    function viewLoop() {
        update()
        drawForeground()
        window.requestAnimationFrame(viewLoop)
    }

    function drawForeground() {
        if (screenMain.tweenGroup.getAll().length === 0) return
        screenMain.tweenGroup.update()
        viewState.clearForeground()
        viewState.renderForeground()
    }

    const div = layout.makeComponent()

    return { div }
}
