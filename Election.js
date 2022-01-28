import castVotes from './castVotes/castVotes.js'
import electionMethods from './electionMethods/electionMethods.js'

// Here we are in the context of a single election with voter objects and candidate bojects.

export default function Election() {
    const self = this

    const voterGroups = []
    let candidates = []

    self.newVoterGroup = function (voterGroup) {
        voterGroups.push(voterGroup)
    }

    self.newCandidate = function (can) {
        candidates.push(can)
    }

    self.clearCandidates = function () {
        candidates = []
    }

    self.getCandidates = function () {
        // return candidates.map(can =>  {x:can.x,y:can.y}) // todo: why doesn't this work?
        return candidates
    }

    self.runElection = function () {
        // Voters cast votes for candidates.
        // There is also a separate graphical representation in VoronoiGroup.js
        const votes = castVotes.pluralityBallot(candidates, voterGroups)

        // why have two different kinds of results?
        // methodResults, the smaller one,
        //   is in the context of the election method,
        //   which has tallies go in and analysis come out
        // electionResults, the larger one,
        //   is in the context of candidate objects and voter objects.
        const methodResults = electionMethods.plurality(votes)

        const { iWinner } = methodResults
        const winner = candidates[iWinner]
        const electionResults = { iWinner, winner }
        return electionResults
    }

    self.updateTallies = function () {
        // only update the tallies for each candidate so they can be shown

        // Voters cast votes for candidates.
        // There is also a separate graphical representation in VoronoiGroup.js
        const votes = castVotes.pluralityBallot(candidates, voterGroups)

        candidates.forEach((can, index) => {
            const fraction = votes.tallyFractions[index]
            can.setFraction(fraction)
        })
    }
}
