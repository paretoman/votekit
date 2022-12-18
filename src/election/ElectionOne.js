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

    const simCastOptions = { usr: 4 }

    self.runElectionSim = function (voterShapeList, candidateList, changes) {
        if (changes.checkNone()) return { error: 'No Changes' }

        // Voters cast votes for candidates.
        // There is also a separate graphical representation in Voronoi2D.js
        const canList = candidateList.getCandidates()
        const voterShapes = voterShapeList.getVoterShapes()

        if (voterShapes.length === 0) return { error: 'No Voters' }
        if (canList.length === 0) return { error: 'No Candidates' }

        const electionResults = election.runElection(voterShapes, canList, simCastOptions)

        return electionResults
    }
}
