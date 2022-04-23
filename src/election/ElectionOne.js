/** @module */

import { maxIndex } from '../utilities/jsHelpers.js'

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

        if (oneVoters.getVoterShapes().length === 0) return { error: 'No Voters' }
        if (candidates.getCandidates().length === 0) return { error: 'No Candidates' }
        const votes = election.castVotes(oneVoters, candidates)
        candidates.setCandidateFractions(votes.tallyFractions)
        return votes
    }

    self.testVote = (voterTest, candidates) => {
        const vote = election.testVote(voterTest, candidates)
        const i = maxIndex(vote.tallyFractions) // TODO
        const cans = candidates.getCandidates()
        vote.color = cans[i].color
        return vote
    }
}
