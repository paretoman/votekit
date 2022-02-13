/** @module */

import castVotes from '../castVotes/castVotes.js'
import ElectionMethod from './ElectionMethod.js'

/**
 * Here we are in the context of a single election with voter objects and candidate jects.
 * @param {Menu} menu
 */
export default function Election(menu) {
    const self = this

    const voterGroups = []
    const candidates = []
    self.method = new ElectionMethod(menu)

    self.newVoterGroup = function (voterGroup) {
        voterGroups.push(voterGroup)
    }

    self.newCandidate = function (can) {
        candidates.push(can)
    }

    self.clearCandidates = function () {
        candidates.splice(0, candidates.length)
    }
    self.clearVoterGroups = function () {
        voterGroups.splice(0, voterGroups.length)
    }
    self.clear = () => {
        candidates.splice(0, candidates.length)
        voterGroups.splice(0, voterGroups.length)
    }

    self.getCandidates = () => candidates

    self.getVoterGroups = () => voterGroups

    // -- Update --

    self.runElection = function () {
        // Voters cast votes for candidates.
        // There is also a separate graphical representation in VoronoiGroup.js
        const votes = castVotes.pluralityBallot(candidates, voterGroups)

        const methodResults = self.method.run(candidates, votes)
        const electionResults = { ...methodResults, votes }
        return electionResults
    }

    self.hypotheticalRun = (newCandidates, newVoterGroups) => {
        const votes = castVotes.pluralityBallot(newCandidates, newVoterGroups)

        const methodResults = self.method.run(newCandidates, votes)
        const electionResults = { ...methodResults, votes }
        return electionResults
    }

    self.updateTallies = function () {
        // only update the tallies for each candidate so they can be shown

        // Voters cast votes for candidates.
        // There is also a separate graphical representation in VoronoiGroup.js
        const votes = self.castVotes()
        self.setCandidateFractions(votes.tallyFractions)
    }
    self.castVotes = () => {
        const votes = castVotes.pluralityBallot(candidates, voterGroups)
        return votes
    }
    self.setCandidateFractions = (fractions) => {
        candidates.forEach((can, index) => {
            const fraction = fractions[index]
            can.setFraction(fraction)
        })
    }
    self.setCandidateWins = (winsByCandidate) => {
        candidates.forEach((can, index) => {
            const win = winsByCandidate[index]
            can.setWins(win)
        })
    }
}
