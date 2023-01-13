/* eslint-disable no-new */

import Screen from '../screen/Screen.js'
import addDarkModeSwitch from './addDarkModeSwitch.js'
import ViewSettings from './ViewSettings.js'
import ViewJupyter from '../environments/ViewJupyter.js'
import ViewVizBudget from './ViewVizBudget.js'
import ViewVizOne from './ViewVizOne.js'
import ViewVizSample from './ViewVizSample.js'
import ViewDistrictMaps from './ViewDistrictMaps.js'
import ViewOne from './ViewOne.js'
import ViewSample from './ViewSample.js'
import ScreenCommon from '../screen/ScreenCommon.js'
import addSvgSwitch from './addSvgSwitch.js'
import addDownloadScreen from './addDownloadScreen.js'

/**
 * Make all the screens and views with screens.
 * @param {*} viewMode
 * @param {*} changes
 * @param {*} menu
 * @param {*} layout
 */
export default function viewScreens(sim, viewMode, menu, layout) {
    const {
        entities, simOptions, electionOptions, changes, update,
    } = sim

    const screenCommon = new ScreenCommon(300, 300)
    const screenMain = new Screen(screenCommon, viewMode, layout, 'viz')
    const screenMini = new Screen(screenCommon, viewMode, layout, 'vizMini')
    screenMini.setHeight(screenCommon.height / 3)
    screenMini.hide()

    addSvgSwitch(screenCommon, layout, viewMode)
    addDownloadScreen(screenCommon, layout)
    addDarkModeSwitch(screenCommon, layout, viewMode)

    const viewSettings = new ViewSettings(changes)
    new ViewOne(entities, screenMain, menu, changes, simOptions, electionOptions, viewMode, viewSettings)
    new ViewSample(entities, screenMain, menu, changes, simOptions, electionOptions, viewMode, viewSettings)
    new ViewJupyter(viewMode, changes)
    new ViewVizOne(entities, screenMain, screenMini, menu, changes, simOptions, electionOptions, viewMode, viewSettings)
    new ViewVizSample(entities, screenMain, menu, changes, simOptions, viewMode, viewSettings)
    new ViewVizBudget(screenCommon, layout, menu, changes, simOptions, electionOptions, viewMode)
    new ViewDistrictMaps(entities, screenCommon, layout, changes, simOptions, electionOptions, viewMode)

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
}
