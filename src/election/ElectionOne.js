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

    const optionCast = { usr: 4 }

    self.runElectionSim = function (oneVoters, candidateSimList, changes) {
        if (changes.checkNone()) return { error: 'No Changes' }

        // Voters cast votes for candidates.
        // There is also a separate graphical representation in Voronoi2D.js
        const canList = candidateSimList.getCandidates()
        const voterShapes = oneVoters.getVoterShapes()

        if (voterShapes.length === 0) return { error: 'No Voters' }
        if (canList.length === 0) return { error: 'No Candidates' }

        const electionResults = election.runElection(voterShapes, canList, optionCast)

        return electionResults
    }

    self.testVote = (voterTest, candidateSimList) => {
        const vote = election.testVote(voterTest, candidateSimList)
        return vote
    }
}
