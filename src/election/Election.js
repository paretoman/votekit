/** @module */

import castVotes from '../castVotes/castVotes.js'
import ElectionMethod from './ElectionMethod.js'

/**
 * Here we are in the context of a single election with voter objects and candidate jects.
 * @param {Menu} menu
 */
export default function Election(menu) {
    const self = this

    self.method = new ElectionMethod(menu)

    self.runElection = function (voterGroups, canList) {
        const votes = castVotes.pluralityBallot(canList, voterGroups)
        const methodResults = self.method.run(canList, votes)
        const electionResults = { ...methodResults, votes }
        return electionResults
    }

    // Voters cast votes for candidates.
    // There is also a separate graphical representation in VoronoiGroup.js
    self.castVotes = (voters, candidates) => {
        const voterGroups = voters.getVoterGroups()
        const canList = candidates.getCandidates()
        const votes = castVotes.pluralityBallot(canList, voterGroups)
        return votes
    }
}
