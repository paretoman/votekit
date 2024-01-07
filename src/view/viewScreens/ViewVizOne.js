/** @module */

import VizDistricts from '../viz/VizDistricts.js'
import VizOneVoronoi from '../viz/VizOneVoronoi.js'
import VizOneVoronoiRanking from '../viz/VizOneVoronoiRanking.js'
import VizOneGrid from '../viz/VizOneGrid.js'
import ViewBase from './ViewBase.js'
import VoterRendererList from '../vizVoters/VoterRendererList.js'
import { checkSomeStrategyForPhase } from '../../sim/geometry/checkSomeStrategy.js'

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

        const { sequenceName, sequences } = optionsBag.sequenceOptions
        const { resultsPhaseBySeq } = simOptions
        const resultsPhaseName = resultsPhaseBySeq[sequenceName]
        const resultsPhaseOptions = sequences[sequenceName].phases[resultsPhaseName]
        const { voteCasterName } = resultsPhaseOptions

        const { dimensions } = simOptions
        const voterGeoms = voterShapeList.getGeoms(dimensions)
        const someGaussian2D = voterGeoms.some((v) => v.densityProfile === 'gaussian') && dimensions === 2

        const someStrategy = getSomeStrategy(optionsBag, voterShapeList, resultsPhaseName, sequenceName, simOptions)

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
        if (changes.check(['numDistricts', 'numTracts', 'dimensions', 'socialChoiceMethod', 'densityProfile', 'strategyRules'])) {
            self.exit()
            self.enter()
        }

        const { geoResults } = simData
        const sequenceResults = simData.geoResults.scResultsByDistrict[0]
        const phaseResults = getPhaseResults(sequenceResults, electionOptionsMan, simOptions)
        const optionsBag = electionOptionsMan.getOptions()
        if (optionsBag.useGeography === true) {
            vizOne.update(geoResults)
        } else {
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

function getSomeStrategy(optionsBag, voterShapeList, resultsPhaseName, sequenceName, simOptions) {
    const { sequenceOptions } = optionsBag
    const voterStrategyListByPhase = voterShapeList.getVoterStrategyListByPhase(sequenceOptions)
    const voterStrategyList = voterStrategyListByPhase[resultsPhaseName]

    let someStrategy
    if (sequenceName === 'closedPrimary') {
        const { resultsPartyBySeq } = simOptions
        const resultsParty = resultsPartyBySeq[resultsPhaseName]

        const voterStrategyListForParty = voterStrategyList.filter((v) => v.party === resultsParty) // not right. need to use party index.
        // todo: consider party. Maybe one primary has no strategic votes and another has some
        someStrategy = checkSomeStrategyForPhase(voterStrategyListForParty)
    } else {
        someStrategy = checkSomeStrategyForPhase(voterStrategyList)
    }
    return someStrategy
}

function getPhaseResults(sequenceResults, electionOptionsMan, simOptions) {
    const optionsBag = electionOptionsMan.getOptions()
    const { sequenceName } = optionsBag.sequenceOptions
    const { resultsPhaseBySeq } = simOptions
    const resultsPhaseName = resultsPhaseBySeq[sequenceName]

    let phaseResults

    if (sequenceName === 'closedPrimary' && resultsPhaseName === 'closedPrimary') {
        const { resultsPartyBySeq } = simOptions
        const resultsParty = resultsPartyBySeq[resultsPhaseName]
        phaseResults = sequenceResults.phases[resultsPhaseName][resultsParty]
    } else {
        phaseResults = sequenceResults.phases[resultsPhaseName]
    }
    return phaseResults
}
