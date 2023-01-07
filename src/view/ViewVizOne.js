/** @module */

import VizDistricts from '../viz/VizDistricts.js'
import VizOneVoronoi from '../viz/VizOneVoronoi.js'
import VizOneVoronoiRanking from '../viz/VizOneVoronoiRanking.js'
import VizOneGrid from '../viz/VizOneGrid.js'
import ViewBase from './ViewBase.js'
import VoterRendererList from '../voters/VoterRendererList.js'

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
 * @param {Sim} sim
 * @param {ViewSettings} viewSettings
 * @constructor
 */
// eslint-disable-next-line max-len
export default function ViewVizOne(entities, screenMain, screenMini, menu, changes, sim, simOptions, electionOptions, viewSM, viewSettings) {
    const self = this

    viewSM.views.one.pub.attach(self)

    ViewBase.call(self, screenMain, changes, viewSettings)

    const { candidateList, voterShapeList } = entities

    // Entities //
    const voterRendererList = new VoterRendererList(voterShapeList)

    // Strategies //
    let vizOne
    function enterStrategy() {
        const { voteCasterName } = electionOptions
        const VizOneVoronoiGeneral = (voteCasterName === 'ranking' || voteCasterName === 'pairwise')
            ? VizOneVoronoiRanking : VizOneVoronoi
        const VizNoDistricts = (voteCasterName === 'score' || voteCasterName === 'scoreLong')
            ? VizOneGrid : VizOneVoronoiGeneral
        const VizOne = (simOptions.useDistricts === true)
            ? VizDistricts : VizNoDistricts
        vizOne = new VizOne(voterRendererList, candidateList, screenMain, screenMini, sim, simOptions)
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
        const { electionResults } = simData
        if (changes.checkNone()) return

        vizOne.update(electionResults)

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
