import BaseExplanation from '../../viz/BaseExplanation.js'
import VizExplanationBudgetMES from '../../viz/VizExplanationBudgetMES.js'

export default function ViewVizBudget(screen, menu, changes, sim) {
    const self = this

    sim.sims.one.pub.attach(self)

    let vizExplanation

    function enterStrategy() {
        const { electionMethod } = sim.election.socialChoice
        const noGeo = !sim.geo
        const { dimensions } = sim.election
        const VizExplanation = (electionMethod === 'methodOfEqualShares' && noGeo && dimensions === 1) ? VizExplanationBudgetMES : BaseExplanation
        vizExplanation = new VizExplanation(screen)
    }
    enterStrategy()

    self.enter = () => {
        vizExplanation.enter()
    }

    self.exit = () => {
        vizExplanation.exit()
    }
    self.update = (electionResults) => {
        if (changes.checkNone()) return
        vizExplanation.update(electionResults)
    }

    self.render = () => {
        vizExplanation.render()
    }
}
