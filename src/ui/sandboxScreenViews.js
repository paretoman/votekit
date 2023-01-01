/* eslint-disable no-new */

import Screen from './Screen.js'
import addDarkModeSwitch from './addDarkModeSwitch.js'
import ViewSettings from '../view/ViewSettings.js'
import ViewJupyter from '../environments/ViewJupyter.js'
import ViewVizBudget from '../view/ViewVizBudget.js'
import ViewVizOne from '../view/ViewVizOne.js'
import ViewVizSample from '../view/ViewVizSample.js'
import ViewGeoMaps from '../view/ViewGeoMaps.js'
import ViewOne from '../view/ViewOne.js'
import ViewSample from '../view/ViewSample.js'
import ScreenCommon from './ScreenCommon.js'
import addSvgSwitch from './addSvgSwitch.js'
import addDownloadScreen from './addDownloadScreen.js'

/**
 * Make all the screens and views with screens.
 * @param {*} viewSM
 * @param {*} sim
 * @param {*} changes
 * @param {*} menu
 * @param {*} layout
 */
export default function sandboxScreenViews(viewSM, entities, sim, simOptions, changes, menu, layout) {
    const screenCommon = new ScreenCommon(300, 300)
    const screenMain = new Screen(screenCommon, viewSM, layout, 'viz')
    const screenMini = new Screen(screenCommon, viewSM, layout, 'vizMini')
    screenMini.setHeight(screenCommon.height / 3)
    screenMini.hide()

    addSvgSwitch(screenCommon, layout, viewSM)
    addDownloadScreen(screenCommon, layout)
    addDarkModeSwitch(screenCommon, layout, viewSM)

    const viewSettings = new ViewSettings(changes)
    new ViewOne(entities, screenMain, menu, changes, sim, simOptions, viewSM, viewSettings)
    new ViewSample(entities, screenMain, menu, changes, sim, viewSM, viewSettings)
    new ViewJupyter(sim, viewSM, changes)
    new ViewVizOne(entities, screenMain, screenMini, menu, changes, sim, simOptions, viewSM, viewSettings)
    new ViewVizSample(entities, screenMain, menu, changes, sim, viewSM, viewSettings)
    new ViewVizBudget(screenCommon, layout, menu, changes, sim, simOptions, viewSM)
    new ViewGeoMaps(entities, screenCommon, layout, changes, sim, viewSM, simOptions)
}