/** @module */

import vizMESChartsCalcBudget from './vizMESChartsCalcBudget.js'
import vizMESChartsCalcShape from './vizMESChartsCalcShape.js'
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
        screen.show()
    }
    self.exit = () => {
        screen.hide()
    }

    self.update = function (electionResults, phaseResults) {
        const { error } = electionResults
        if (error !== undefined) {
            flagNoRender = true
            return
        }
        flagNoRender = false

        const budgetDataMES = vizMESChartsCalcBudget(electionResults, phaseResults)
        chartDataMES = vizMESChartsCalcShape(phaseResults, screen, budgetDataMES)
    }

    self.render = function () {
        if (flagNoRender) return

        vizMESChartsRender(screen, chartDataMES)
    }
}
