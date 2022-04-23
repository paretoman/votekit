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

    self.updateTallies = function (oneVoters, candidates) {
        // only update the tallies for each candidate so they can be shown

        // Voters cast votes for candidates.
        // There is also a separate graphical representation in Voronoi2D.js

        if (oneVoters.getVoterGroups().length === 0) return
        if (candidates.getCandidates().length === 0) return
        const votes = election.castVotes(oneVoters, candidates)
        candidates.setCandidateFractions(votes.tallyFractions)
    }

    self.testVote = (testVoter, candidates) => {
        const vote = election.testVote(testVoter, candidates)
        const i = vote.tallyFractions.indexOf(1)
        const cans = candidates.getCandidates()
        vote.color = cans[i].color
        return vote
    }
}
