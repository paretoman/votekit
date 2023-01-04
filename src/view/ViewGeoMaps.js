/** @module */

import Screen from '../ui/Screen.js'
import GeoMaps from '../viz/GeoMaps.js'

/**
 * Show votes
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function ViewGeoMaps(entities, screenCommon, layout, changes, sim, simOptions, electionOptions, viewSM) {
    const self = this

    viewSM.views.one.pub.attach(self)

    const screen = new Screen(screenCommon, viewSM, layout, 'maps')
    const { height } = screenCommon
    screen.setHeight(height / 3)
    screen.hide()

    const geoMaps = new GeoMaps(entities.candidateList, screen, electionOptions, changes)
    let flagNoRender = false

    self.enter = () => {
        if (simOptions.geo) screen.show()
    }
    self.exit = () => {
        screen.hide()
    }

    self.update = function (geoElectionResults) {
        const { error } = geoElectionResults
        if (error !== undefined) {
            flagNoRender = true
            return
        }
        flagNoRender = false

        if (simOptions.geo) {
            geoMaps.update(geoElectionResults)
            self.clear()
            self.render()
        }
    }

    self.render = function () {
        if (flagNoRender) return

        if (simOptions.geo) geoMaps.render()
    }
    self.clear = () => {
        screen.clear()
    }
    self.draw = () => {
        self.clear()
        self.render()
    }
}
