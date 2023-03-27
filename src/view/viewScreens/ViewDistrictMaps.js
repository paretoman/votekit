/** @module */

import Screen from '../screen/Screen.js'
import DistrictMapViz from '../viz/DistrictMapViz.js'

/**
 * Show votes
 * @constructor
 */
export default function ViewDistrictMaps(entities, screenCommon, layout, changes, simOptions, electionOptionsMan, viewMode) {
    const self = this

    viewMode.viewModes.one.attach(self)

    const screen = new Screen(screenCommon, viewMode, layout, 'maps')
    const { height } = screenCommon
    screen.setHeight(height / 3)
    screen.hide()

    const districtMapViz = new DistrictMapViz(entities.candidateList, screen, electionOptionsMan, simOptions, changes)
    let flagNoRender = false

    self.enter = () => {
        const electionOptions = electionOptionsMan.getOptions()
        if (electionOptions.useGeography) {
            screen.show()
        }
    }
    self.exit = () => {
        screen.hide()
    }

    self.update = function (simData) {
        const electionOptions = electionOptionsMan.getOptions()
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
            districtMapViz.update(electionResults)
            self.clear()
            self.render()
        }
    }

    self.render = function () {
        if (flagNoRender) return

        const electionOptions = electionOptionsMan.getOptions()
        if (electionOptions.useGeography) districtMapViz.render()
    }
    self.clear = () => {
        screen.clear()
    }
    self.draw = () => {
        self.clear()
        self.render()
    }
}
