/** @module */

/**
 * A simple election.
 * Voters are in shaped distributions.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Election} election
 * @constructor
 */
export default function ElectionOne(election) {
    const self = this

    self.runElectionSim = function (geometry) {
        // Voters cast votes for candidates.
        // There is also a separate graphical representation in Voronoi2D.js
        const { canGeoms, voterGeoms } = geometry
        if (voterGeoms.length === 0) return { error: 'No Voters' }
        if (canGeoms.length === 0) return { error: 'No Candidates' }

        const electionResults = election.runElection(geometry)

        return electionResults
    }
}
