/** @module */

import vizMESChartsCalc from './VizMESChartsCalc.js'
import vizMESChartsRender from './vizMESChartsRender.js'

/**
 * Show votes
 * @param {Screen} screen
 * @constructor
 */
export default function VizExplanationBudgetMES(screen) {
    const self = this

    let flagNoRender = false
    let chartDataMES

    self.enter = () => {
        screen.showMaps()
    }
    self.exit = () => {
        screen.hideMaps()
    }

    self.update = function (electionResults) {
        const { error } = electionResults
        if (error !== undefined) {
            flagNoRender = true
            return
        }
        flagNoRender = false

        chartDataMES = vizMESChartsCalc(electionResults, screen)
    }

    self.render = function () {
        if (flagNoRender) return

        vizMESChartsRender(screen, chartDataMES)
    }
}
