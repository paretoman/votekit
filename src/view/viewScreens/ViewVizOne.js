/** @module */

import VizDistricts from '../viz/VizDistricts.js'
import VizOneVoronoi from '../viz/VizOneVoronoi.js'
import VizOneVoronoiRanking from '../viz/VizOneVoronoiRanking.js'
import VizOneGrid from '../viz/VizOneGrid.js'
import ViewBase from './ViewBase.js'
import VoterRendererList from '../vizVoters/VoterRendererList.js'
import getResultsPhaseOptions from '../phase/getResultsPhaseOptions.js'
import checkSomeStrategy from '../strategy/checkSomeStrategy.js'
import getPhaseResults from '../phase/getPhaseResults.js'

/**
 * Simulate one election with
 *   candidates in defined positions, and
 *   voters in a distribution that will be summed over.
 * Create a geographical district map with variations of voter center.
 * Plan:
 * * Voronoi1D is called by VizOne.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {ViewSettings} viewSettings
 * @constructor
 */
// eslint-disable-next-line max-len
export default function ViewVizOne(entities, screenMain, screenMini, menu, changes, simOptions, electionOptionsMan, viewMode, viewSettings) {
    const self = this

    viewMode.viewModes.one.attach(self)

    ViewBase.call(self, screenMain, changes, viewSettings)

    const { candidateList, voterShapeList } = entities

    // Entities //
    const voterRendererList = new VoterRendererList(voterShapeList)

    // Strategies //
    let vizOne
    function enterStrategy() {
        const optionsBag = electionOptionsMan.getOptions()

        const resultsPhaseOptions = getResultsPhaseOptions(optionsBag, simOptions)
        const { voteCasterName } = resultsPhaseOptions

        const { dimensions } = simOptions
        const voterGeoms = voterShapeList.getGeoms(dimensions)
        const someGaussian2D = voterGeoms.some((v) => v.densityProfile === 'gaussian') && dimensions === 2

        const someStrategy = checkSomeStrategy(optionsBag, voterShapeList, simOptions)

        const doGrid = someGaussian2D || someStrategy || voteCasterName === 'score' || voteCasterName === 'scoreFull'

        const doRanking = voteCasterName === 'ranking' || voteCasterName === 'pairwise'

        const VizOneVoronoiGeneral = (doRanking) ? VizOneVoronoiRanking : VizOneVoronoi
        const VizNoDistricts = (doGrid) ? VizOneGrid : VizOneVoronoiGeneral
        const VizOne = (optionsBag.useGeography === true) ? VizDistricts : VizNoDistricts
        vizOne = new VizOne(voterRendererList, candidateList, screenMain, screenMini, simOptions)
    }
    enterStrategy()

    // Main State Machine Functions //
    self.enter = () => {
        enterStrategy()
        vizOne.enter()
    }

    self.exit = () => {
        vizOne.exit()
    }

    self.update = (simData) => {
        if (changes.checkNone()) return

        const changeList = ['numDistricts', 'numTracts', 'dimensions', 'socialChoiceMethod', 'densityProfile', 'strategyRules', 'resultsPhase', 'resultsParty', 'sequenceName']
        if (changes.check(changeList)) {
            self.exit()
            self.enter()
        }

        const optionsBag = electionOptionsMan.getOptions()

        if (optionsBag.useGeography === true) {
            const { geoResults } = simData
            vizOne.update(geoResults)
        } else {
            const sequenceResults = simData.geoResults.scResultsByDistrict[0]
            const phaseResults = getPhaseResults(sequenceResults, simOptions)
            vizOne.update(phaseResults)
        }

        self.clear()
        self.render()
    }

    self.render = () => {
        vizOne.render()
    }
    self.clear = () => {
        screenMain.clear()
        screenMini.clear()
    }
}
