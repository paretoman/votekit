/** @module */

import GeoMaps from '../viz/GeoMaps.js'

/**
 * Show votes
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function ViewGeoMaps(entities, screen, sim) {
    const self = this

    sim.sims.one.pub.attach(self)

    const geoMaps = new GeoMaps(sim.voterGeo, entities.candidateList, screen, sim)
    let flagNoRender = false

    self.enter = () => {
        if (sim.geo) screen.showMaps()
    }
    self.exit = () => {
        screen.hideMaps()
    }

    self.update = function (geoElectionResults) {
        const { error } = geoElectionResults
        if (error !== undefined) {
            flagNoRender = true
            return
        }
        flagNoRender = false

        if (sim.geo) {
            geoMaps.update(geoElectionResults)
            self.render()
        }
    }

    self.render = function () {
        if (flagNoRender) return

        if (sim.geo) geoMaps.render()
    }
}
