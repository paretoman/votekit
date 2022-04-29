/** @module */

import Grid1D from './Grid1D.js'
import Grid2D from './Grid2D.js'

/**
 * Show votes
 * @param {VoterGeoList} voterGeoList
 * @param {CandidateSimList} candidateSimList
 * @param {Screen} screen
 * @param {Sim} sim
 * @constructor
 */
export default function VizOneGrid(voterGeoList, candidateSimList, screen, sim, changes) {
    const self = this
    let renderers

    self.update = function (voterList, electionResults) {
        const { dimensions } = sim.election

        if (changes.check(['viz', 'electionMethod', 'dimensions'])) {
            if (dimensions === 2) {
                screen.showMaps()
            } else {
                screen.hideMaps()
            }
        }

        // renderer factory //

        const Grid = (dimensions === 1) ? Grid1D : Grid2D

        const { votes } = electionResults
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
