/** @module */

import colorBlend from './colorBlend.js'

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

    self.updateTallies = function (oneVoters, candidateSimList) {
        // only update the tallies for each candidate so they can be shown

        // Voters cast votes for candidates.
        // There is also a separate graphical representation in Voronoi2D.js

        if (oneVoters.getVoterShapes().length === 0) return { error: 'No Voters' }
        if (candidateSimList.getCandidates().length === 0) return { error: 'No Candidates' }
        const votes = election.castVotes(oneVoters, candidateSimList, optionCast)
        candidateSimList.setCandidateFractions(votes.tallyFractions)
        return votes
    }

    self.testVote = (voterTest, candidateSimList) => {
        const vote = election.testVote(voterTest, candidateSimList)

        const canList = candidateSimList.getCandidates()
        const colorSet = canList.map((can) => can.color)

        const { tallyFractions } = vote
        const color = colorBlend(tallyFractions, colorSet)

        vote.color = color
        return vote
    }
}
