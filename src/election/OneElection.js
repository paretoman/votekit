export default function OneElection(screen, menu, election) {
    const self = this

    self.updateTallies = function (voters, candidates) {
        // only update the tallies for each candidate so they can be shown

        // Voters cast votes for candidates.
        // There is also a separate graphical representation in VoronoiGroup.js
        const votes = election.castVotes(voters, candidates)
        candidates.setCandidateFractions(votes.tallyFractions)
    }
}
