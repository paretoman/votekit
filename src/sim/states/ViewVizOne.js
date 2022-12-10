/** @module */

import VizGeo from '../../viz/VizGeo.js'
import VizOneVoronoi from '../../viz/VizOneVoronoi.js'
import VizOneVoronoiRanking from '../../viz/VizOneVoronoiRanking.js'
import VizOneGrid from '../../viz/VizOneGrid.js'
import ViewBase from './ViewBase.js'
import VoterRendererList from '../../voters/VoterRendererList.js'

/**
 * Simulate one election with
 *   candidates in defined positions, and
 *   voters in a distribution that will be summed over.
 * Create a geographical map with variations of voter center.
 * Plan:
 * * Voronoi1D is called by VizOne.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Changes} changes
 * @param {ElectionOne} electionOne
 * @param {ElectionGeo} electionGeo
 * @param {VoterGeo} voterGeo
 * @param {Sim} sim
 * @param {View} view
 * @constructor
 */
export default function ViewVizOne(entities, screen, menu, changes, sim, view) {
    const self = this

    sim.sims.one.pub.attach(self)

    ViewBase.call(self, screen, changes, view)

    const { candidateList, voterShapeList } = entities

    // Entities //
    const voterRendererList = new VoterRendererList(voterShapeList)

    // Strategies //
    let vizOne
    function enterStrategy() {
        const { casterName } = sim.election.socialChoice
        const VizOneVoronoiGeneral = (casterName === 'ranking' || casterName === 'pairwise') ? VizOneVoronoiRanking : VizOneVoronoi
        const VizNoGeo = (casterName === 'score' || casterName === 'scoreLong') ? VizOneGrid : VizOneVoronoiGeneral
        if (sim.geo === true) {
            vizOne = new VizGeo(sim.voterGeo, voterRendererList, candidateList, screen, sim)
        } else {
            vizOne = new VizNoGeo(voterRendererList, candidateList, screen, sim)
        }
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

    self.update = (electionResults) => {
        if (changes.checkNone()) return

        vizOne.update(electionResults)

        screen.clear()
        screen.clearMaps()
        self.render()
    }

    self.render = () => {
        vizOne.render()
    }
}
