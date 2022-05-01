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

    self.runElection = function (oneVoters, candidateSimList) {
        // Voters cast votes for candidates.
        // There is also a separate graphical representation in Voronoi2D.js
        const canList = candidateSimList.getCandidates()

        if (oneVoters.getVoterShapes().length === 0) return { error: 'No Voters' }
        if (canList.length === 0) return { error: 'No Candidates' }
        const votes = election.castVotes(oneVoters, candidateSimList, optionCast)
        const electionResults = election.countVotes.run(canList, votes)
        return electionResults
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
