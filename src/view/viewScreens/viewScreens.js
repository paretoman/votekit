/* eslint-disable no-new */

import Screen from '../screen/Screen.js'
import addDarkModeSwitch from './addDarkModeSwitch.js'
import ViewSettings from './ViewSettings.js'
import ViewVizBudget from './ViewVizBudget.js'
import ViewVizOne from './ViewVizOne.js'
import ViewVizSample from './ViewVizSample.js'
import ViewDistrictMaps from './ViewDistrictMaps.js'
import ViewEntitiesOne from './ViewEntitiesOne.js'
import ViewEntitiesSample from './ViewEntitiesSample.js'
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
export default function viewScreens(sim, viewMode, layout, viewChanges, menu) {
    const {
        entities, simOptions, electionOptionsMan, changes,
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
    new ViewEntitiesOne(entities, screenMain, menu, changes, simOptions, electionOptionsMan, viewMode, viewSettings, viewChanges)
    new ViewEntitiesSample(entities, screenMain, menu, changes, simOptions, electionOptionsMan, viewMode, viewSettings)
    new ViewVizOne(entities, screenMain, screenMini, menu, changes, simOptions, electionOptionsMan, viewMode, viewSettings)
    new ViewVizSample(entities, screenMain, menu, changes, simOptions, viewMode, viewSettings)
    new ViewVizBudget(screenCommon, layout, menu, changes, simOptions, electionOptionsMan, viewMode)
    new ViewDistrictMaps(entities, screenCommon, layout, changes, simOptions, electionOptionsMan, viewMode)

    return { screenMain }
}
