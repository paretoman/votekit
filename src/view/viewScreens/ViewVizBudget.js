import Screen from '../screen/Screen.js'
import BaseExplanation from '../viz/BaseExplanation.js'
import VizExplanationBudgetMES from '../viz/VizExplanationBudgetMES.js'
import getResultsPhaseOptions from '../phase/getResultsPhaseOptions.js'
import getPhaseResults from '../phase/getPhaseResults.js'

export default function ViewVizBudget(screenCommon, layout, menu, changes, simOptions, electionOptionsMan, viewMode) {
    const self = this

    viewMode.viewModes.one.attach(self)

    const screen = new Screen(screenCommon, viewMode, layout, 'budget')
    const { height } = screenCommon
    screen.setHeight(height / 3)
    screen.hide()

    let vizExplanation

    function enterStrategy() {
        const optionsBag = electionOptionsMan.getOptions()
        const { useGeography } = optionsBag

        const resultsPhaseOptions = getResultsPhaseOptions(optionsBag, simOptions)
        const { socialChoiceMethod } = resultsPhaseOptions

        const { dimensions } = simOptions
        const VizExplanation = (socialChoiceMethod === 'methodOfEqualShares' && !useGeography && dimensions === 1)
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
        if (changes.check(['numDistricts', 'numTracts', 'dimensions', 'socialChoiceMethod'])) {
            self.exit()
            self.enter()
        }

        const optionsBag = electionOptionsMan.getOptions()

        if (optionsBag.useGeography === true) {
            // skip
        } else {
            const { geoResults } = simData
            const sequenceResults = geoResults.scResultsByDistrict[0]
            const phaseResults = getPhaseResults(sequenceResults, simOptions)
            vizExplanation.update(geoResults, sequenceResults, phaseResults)
        }

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
