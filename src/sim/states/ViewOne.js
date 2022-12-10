/** @module */

import CandidateViewList from '../../candidates/CandidateViewList.js'
import VoterViewList from '../../voters/VoterViewList.js'
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
export default function ViewOne(entities, screen, menu, changes, sim, view) {
    const self = this

    ViewBase.call(self, screen, changes, view)

    const { candidateList, voterShapeList } = entities

    // Entities //
    const candidateViewList = new CandidateViewList(view, candidateList, screen, sim.election)
    const voterViewList = new VoterViewList(view, voterShapeList, screen, sim.election)
    const voterRendererList = new VoterRendererList(voterShapeList)
    candidateViewList.attachNewG(self.dragm)
    voterViewList.attachNewG(self.dragm)

    changes.add(['districts'])

    // Strategies //
    let vizOne
    function enterStrategy() {
        const { casterName } = sim.election.socialChoice
        const VizOneVoronoiGeneral = (casterName === 'ranking' || casterName === 'pairwise') ? VizOneVoronoiRanking : VizOneVoronoi
        const VizNoGeo = (casterName === 'score' || casterName === 'scoreLong') ? VizOneGrid : VizOneVoronoiGeneral
        if (sim.geo === true) {
            vizOne = new VizGeo(sim.voterGeo, voterRendererList, candidateViewList, screen, sim)
        } else {
            vizOne = new VizNoGeo(voterRendererList, candidateViewList, screen, sim)
        }
    }
    enterStrategy()

    // Main State Machine Functions //

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        enterStrategy()

        candidateList.canButton.show()
        vizOne.enter()
        voterViewList.updateViewXY()
        candidateViewList.updateViewXY()
        view.voterTest.updateViewXY()
    }

    self.exit = () => {
        vizOne.exit()
        candidateList.canButton.hide()
        view.voterTest.setE(0)
    }

    self.update = (electionResults) => {
        if (changes.checkNone()) return

        if (changes.check(['draggables'])) {
            // this will trigger when undo moves entities
            voterViewList.updateViewXY()
            candidateViewList.updateViewXY()
        }

        vizOne.update(electionResults)
        self.testVoteView()

        screen.clear()
        screen.clearMaps()
        self.render()
    }

    self.testVoteView = () => {
        const vote = sim.election.testVoteE(view.voterTest, candidateList)
        view.voterTest.update(vote, candidateList)
        return vote
    }

    self.render = () => {
        vizOne.render()
    }
    self.renderForeground = () => {
        voterViewList.renderForeground()
        candidateViewList.renderForeground()
        view.voterTest.renderForeground()
    }
}
