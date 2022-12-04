/** @module */

import CandidateViewList from '../../candidates/CandidateViewList.js'
import VoterViewList from '../../voters/VoterViewList.js'
import VizGeo from '../../viz/VizGeo.js'
import VizOneVoronoi from '../../viz/VizOneVoronoi.js'
import VizOneVoronoiRanking from '../../viz/VizOneVoronoiRanking.js'
import VizOneGrid from '../../viz/VizOneGrid.js'
import jupyterUpdate, { jupyterClear } from '../../environments/jupyter.js'
import VizExplanationBudgetMES from '../../viz/VizExplanationBudgetMES.js'
import BaseExplanation from '../../viz/BaseExplanation.js'
import ViewBase from './ViewBase.js'

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
export default function ViewOne(screen, menu, changes, sim, view) {
    const self = this

    ViewBase.call(self, screen, changes, view)

    // Entities //
    const candidateViewList = new CandidateViewList(view, sim, screen, sim.election)
    const voterViewList = new VoterViewList(view, sim, screen)
    candidateViewList.attachNewG(self.dragm)
    voterViewList.attachNewG(self.dragm)

    changes.add(['districts'])

    // Strategies //
    let vizOne
    let vizExplanation
    function enterStrategy() {
        const { casterName } = sim.election.socialChoice
        const VizOneVoronoiGeneral = (casterName === 'ranking' || casterName === 'pairwise') ? VizOneVoronoiRanking : VizOneVoronoi
        const VizNoGeo = (casterName === 'score' || casterName === 'scoreLong') ? VizOneGrid : VizOneVoronoiGeneral
        if (sim.geo === true) {
            vizOne = new VizGeo(sim.voterGeo, voterViewList, candidateViewList, screen, sim)
        } else {
            vizOne = new VizNoGeo(voterViewList, candidateViewList, screen, sim)
        }

        const { electionMethod } = sim.election.socialChoice
        const noGeo = !sim.geo
        const { dimensions } = sim.election
        const VizExplanation = (electionMethod === 'methodOfEqualShares' && noGeo && dimensions === 1) ? VizExplanationBudgetMES : BaseExplanation
        vizExplanation = new VizExplanation(screen)
    }
    enterStrategy()

    // Main State Machine Functions //

    const superEnter = self.enter
    self.enter = () => {
        superEnter()
        enterStrategy()

        sim.candidateList.canButton.show()
        vizOne.enter()
        vizExplanation.enter()
        voterViewList.updateXY()
        candidateViewList.updateXY()
        view.voterTest.updateXY()
    }

    self.exit = () => {
        vizOne.exit()
        vizExplanation.exit()
        sim.candidateList.canButton.hide()
        view.voterTest.setE(0)
    }

    self.update = (electionResults) => {
        if (changes.checkNone()) return

        jupyterClear()
        jupyterUpdate({ electionResults })
        vizOne.update(electionResults)
        vizExplanation.update(electionResults)
        self.testVoteView()
        changes.clear()

        screen.clear()
        screen.clearMaps()
        self.render()
    }

    self.testVoteView = () => {
        const vote = sim.election.testVoteE(view.voterTest, sim.candidateList)
        view.voterTest.update(vote, sim.candidateList)
        return vote
    }

    self.render = () => {
        vizOne.render()
        vizExplanation.render()
    }
    self.renderForeground = () => {
        voterViewList.renderForeground()
        candidateViewList.renderForeground()
        view.voterTest.renderForeground()
    }
}
