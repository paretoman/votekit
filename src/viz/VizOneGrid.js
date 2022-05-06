/** @module */

import addAllocation from './addAllocation.js'
import Grid1D from './Grid1D.js'
import Grid2D from './Grid2D.js'

/**
 * Show votes
 * @param {VoterSimList} voterSimList
 * @param {CandidateSimList} candidateSimList
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function VizOneGrid(voterSimList, candidateSimList, screen, sim, changes) {
    const self = this

    // renderer factory //
    const { dimensions } = sim.election
    const Grid = (dimensions === 1) ? Grid1D : Grid2D
    const rendererMaker = () => new Grid(candidateSimList, screen)
    voterSimList.setRenderer(rendererMaker)

    self.update = function (electionResults) {
        if (changes.check(['viz', 'electionMethod', 'dimensions'])) {
            if (dimensions === 2) {
                screen.showMaps()
            } else {
                screen.hideMaps()
            }
        }

        const { error } = electionResults
        if (error !== undefined) return

        const { tallyFractions, allocation } = addAllocation(electionResults)
        candidateSimList.setCandidateWins(allocation)
        candidateSimList.setCandidateFractions(tallyFractions)

        const { gridData } = electionResults.votes
        voterSimList.updateGraphic(gridData)
    }
    self.render = function () {
        if (sim.election.dimensions === 1) {
            voterSimList.renderBackground()
        }

        voterSimList.render()
    }
}
