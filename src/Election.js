import castVotes from './castVotes/castVotes.js'
import ElectionMethod from './ElectionMethod.js'

// Here we are in the context of a single election with voter objects and candidate bojects.

export default function Election(menu) {
    const self = this

    const voterGroups = []
    const candidates = []
    self.method = new ElectionMethod(candidates, menu)

    self.newVoterGroup = function (voterGroup) {
        voterGroups.push(voterGroup)
    }

    self.newCandidate = function (can) {
        candidates.push(can)
    }

    self.clearCandidates = function () {
        candidates.splice(0, candidates.length)
    }
    self.clear = () => {
        candidates.splice(0, candidates.length)
        voterGroups.splice(0, voterGroups.length)
    }

    self.getCandidates = function () {
        // return candidates.map(can =>  {x:can.x,y:can.y}) // todo: why doesn't this work?
        return candidates
    }

    // -- Update --

    self.runElection = function () {
        // Voters cast votes for candidates.
        // There is also a separate graphical representation in VoronoiGroup.js
        const votes = castVotes.pluralityBallot(candidates, voterGroups)

        const electionResults = self.method.run(votes)
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
