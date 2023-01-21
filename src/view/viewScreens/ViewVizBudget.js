import Screen from '../screen/Screen.js'
import BaseExplanation from '../viz/BaseExplanation.js'
import VizExplanationBudgetMES from '../viz/VizExplanationBudgetMES.js'

export default function ViewVizBudget(screenCommon, layout, menu, changes, simOptions, electionOptions, viewMode) {
    const self = this

    viewMode.viewModes.one.attach(self)

    const screen = new Screen(screenCommon, viewMode, layout, 'budget')
    const { height } = screenCommon
    screen.setHeight(height / 3)
    screen.hide()

    let vizExplanation

    function enterStrategy() {
        const { socialChoiceMethod } = electionOptions
        const { dimensions, numDistricts } = simOptions
        const VizExplanation = (socialChoiceMethod === 'methodOfEqualShares' && numDistricts === 1 && dimensions === 1)
            ? VizExplanationBudgetMES : BaseExplanation
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
        if (changes.checkNone()) return
        if (changes.check(['numDistricts', 'dimensions', 'socialChoiceMethod'])) {
            self.exit()
            self.enter()
        }

        const { electionResults } = simData
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
