/** @module */

import Screen from '../ui/Screen.js'
import GeoMaps from '../viz/GeoMaps.js'

/**
 * Show votes
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function ViewGeoMaps(entities, screenCommon, layout, changes, sim, view) {
    const self = this

    view.views.one.pub.attach(self)

    const screen = new Screen(screenCommon, view, layout, 'maps')
    const { height } = screenCommon
    screen.setHeight(height / 3)
    screen.hide()

    const geoMaps = new GeoMaps(sim.voterGeo, entities.candidateList, screen, sim)
    let flagNoRender = false

    self.enter = () => {
        if (sim.geo) screen.show()
    }
    self.exit = () => {
        screen.hide()
    }

    self.update = function (geoElectionResults) {
        if (changes.check(['rerender']) && changes.numChanges === 1) {
            self.clear()
            self.render()
            return
        }

        const { error } = geoElectionResults
        if (error !== undefined) {
            flagNoRender = true
            return
        }
        flagNoRender = false

        if (sim.geo) {
            geoMaps.update(geoElectionResults)
            self.clear()
            self.render()
        }
    }

    self.render = function () {
        if (flagNoRender) return

        if (sim.geo) geoMaps.render()
    }
    self.clear = () => {
        screen.clear()
    }
    self.draw = () => {
        self.clear()
        self.render()
    }
}
