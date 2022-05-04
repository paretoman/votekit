/** @module */

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
    let renderers = []

    self.update = function (electionResults) {
        const { dimensions } = sim.election

        if (changes.check(['viz', 'electionMethod', 'dimensions'])) {
            if (dimensions === 2) {
                screen.showMaps()
            } else {
                screen.hideMaps()
            }
        }

        const { error } = electionResults
        if (error !== undefined) return

        const { votes } = electionResults
        const nk = votes.tallyFractions.length
        const wins = Array(nk).fill(0)
        wins[electionResults.iWinner] = 1
        candidateSimList.setCandidateWins(wins)
        candidateSimList.setCandidateFractions(votes.tallyFractions)

        // renderer factory //

        const Grid = (dimensions === 1) ? Grid1D : Grid2D

        if (votes.error) renderers = []
        renderers = votes.gridData.map(
            (vo) => new Grid(vo, candidateSimList, screen),
        )
    }
    self.render = function () {
        if (sim.election.dimensions === 1) {
            renderers.forEach(
                (renderer) => renderer.renderBackground(),
            )
        }

        renderers.forEach(
            (renderer) => renderer.render(),
        )
    }
}
