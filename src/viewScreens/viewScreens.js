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
 * @param {*} viewState
 * @param {*} changes
 * @param {*} menu
 * @param {*} layout
 */
export default function viewScreens(sim, viewState, menu, layout) {
    const {
        entities, simOptions, electionOptions, changes, pub,
    } = sim

    const screenCommon = new ScreenCommon(300, 300)
    const screenMain = new Screen(screenCommon, viewState, layout, 'viz')
    const screenMini = new Screen(screenCommon, viewState, layout, 'vizMini')
    screenMini.setHeight(screenCommon.height / 3)
    screenMini.hide()

    addSvgSwitch(screenCommon, layout, viewState)
    addDownloadScreen(screenCommon, layout)
    addDarkModeSwitch(screenCommon, layout, viewState)

    const viewSettings = new ViewSettings(changes)
    new ViewOne(entities, screenMain, menu, changes, simOptions, electionOptions, viewState, viewSettings)
    new ViewSample(entities, screenMain, menu, changes, simOptions, electionOptions, viewState, viewSettings)
    new ViewJupyter(pub, changes)
    new ViewVizOne(entities, screenMain, screenMini, menu, changes, simOptions, electionOptions, viewState, viewSettings)
    new ViewVizSample(entities, screenMain, menu, changes, simOptions, viewState, viewSettings)
    new ViewVizBudget(screenCommon, layout, menu, changes, simOptions, electionOptions, viewState)
    new ViewDistrictMaps(entities, screenCommon, layout, changes, simOptions, electionOptions, viewState)

    return { screenMain }
}
