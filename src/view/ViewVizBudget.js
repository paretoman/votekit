import Screen from '../ui/Screen.js'
import BaseExplanation from '../viz/BaseExplanation.js'
import VizExplanationBudgetMES from '../viz/VizExplanationBudgetMES.js'

export default function ViewVizBudget(screenCommon, layout, menu, changes, simOptions, electionOptions, viewSM) {
    const self = this

    viewSM.views.one.pub.attach(self)

    const screen = new Screen(screenCommon, viewSM, layout, 'budget')
    const { height } = screenCommon
    screen.setHeight(height / 3)
    screen.hide()

    let vizExplanation

    function enterStrategy() {
        const { electionMethod } = electionOptions
        const noDistricts = !simOptions.useDistricts
        const { dimensions } = simOptions
        const VizExplanation = (electionMethod === 'methodOfEqualShares' && noDistricts && dimensions === 1) ? VizExplanationBudgetMES : BaseExplanation
        vizExplanation = new VizExplanation(screen)
    }
    enterStrategy()

    self.enter = () => {
        enterStrategy()
        vizExplanation.enter()
    }

    self.exit = () => {
        vizExplanation.exit()
    }
    self.update = (simData) => {
        const { electionResults } = simData
        if (changes.checkNone()) return

        vizExplanation.update(electionResults)
        self.clear()
        self.render()
    }

    self.render = () => {
        vizExplanation.render()
    }
    self.clear = () => {
        screen.clear()
    }
    self.draw = () => {
        self.clear()
        self.render()
    }
}
