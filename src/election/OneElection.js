/** @module */

/**
 * A simple election.
 * Voters are in shaped distributions.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Election} election
 * @constructor
 */
export default function OneElection(screen, menu, election) {
    const self = this

    self.updateTallies = function (oneVoters, candidates) {
        // only update the tallies for each candidate so they can be shown

        // Voters cast votes for candidates.
        // There is also a separate graphical representation in VoronoiGroup.js

        if (oneVoters.getVoterGroups().length === 0) return
        if (candidates.getCandidates().length === 0) return
        const votes = election.castVotes(oneVoters, candidates)
        candidates.setCandidateFractions(votes.tallyFractions)
    }
}
