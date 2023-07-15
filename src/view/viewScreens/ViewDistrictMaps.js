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
        const optionsBag = electionOptionsMan.getOptions()
        if (optionsBag.useGeography) {
            screen.show()
        }
    }
    self.exit = () => {
        screen.hide()
    }

    self.update = function (simData) {
        const optionsBag = electionOptionsMan.getOptions()
        if (changes.check(['numDistricts', 'numTracts'])) {
            if (optionsBag.useGeography) {
                screen.show()
            } else {
                screen.hide()
            }
        }
        const { sequenceResults } = simData
        const { error } = sequenceResults
        if (error !== undefined) {
            flagNoRender = true
            return
        }
        flagNoRender = false

        if (optionsBag.useGeography) {
            districtMapViz.update(sequenceResults.phases.general)
            self.clear()
            self.render()
        }
    }

    self.render = function () {
        if (flagNoRender) return

        const optionsBag = electionOptionsMan.getOptions()
        if (optionsBag.useGeography) districtMapViz.render()
    }
    self.clear = () => {
        screen.clear()
    }
    self.draw = () => {
        self.clear()
        self.render()
    }
}
