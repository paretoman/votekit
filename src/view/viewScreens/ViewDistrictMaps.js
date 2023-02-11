/** @module */

import Screen from '../screen/Screen.js'
import DistrictMaps from '../viz/DistrictMaps.js'

/**
 * Show votes
 * @constructor
 */
export default function ViewDistrictMaps(entities, screenCommon, layout, changes, simOptions, electionOptions, viewMode) {
    const self = this

    viewMode.viewModes.one.attach(self)

    const screen = new Screen(screenCommon, viewMode, layout, 'maps')
    const { height } = screenCommon
    screen.setHeight(height / 3)
    screen.hide()

    const districtMaps = new DistrictMaps(entities.candidateList, screen, electionOptions, changes)
    let flagNoRender = false

    self.enter = () => {
        if (electionOptions.useGeography) {
            screen.show()
        }
    }
    self.exit = () => {
        screen.hide()
    }

    self.update = function (simData) {
        if (changes.check(['numDistricts', 'numTracts'])) {
            if (electionOptions.useGeography) {
                screen.show()
            } else {
                screen.hide()
            }
        }
        const { electionResults } = simData
        const { error } = electionResults
        if (error !== undefined) {
            flagNoRender = true
            return
        }
        flagNoRender = false

        if (electionOptions.useGeography) {
            districtMaps.update(electionResults)
            self.clear()
            self.render()
        }
    }

    self.render = function () {
        if (flagNoRender) return

        if (electionOptions.useGeography) districtMaps.render()
    }
    self.clear = () => {
        screen.clear()
    }
    self.draw = () => {
        self.clear()
        self.render()
    }
}
