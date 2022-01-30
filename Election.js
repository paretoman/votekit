import castVotes from './castVotes/castVotes.js'
import electionMethods from './electionMethods/electionMethods.js'

// Here we are in the context of a single election with voter objects and candidate bojects.

export default function Election(menu) {
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

    // -- Update --

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
        let electionResults
        if (self.checkElectionType() === 'allocation') {
            const electionMethodOptions = { seats: 5, threshold: 0.2 }
            const methodResults = electionMethods[self.electionMethod](votes, electionMethodOptions)
            const { allocation } = methodResults
            electionResults = { allocation, candidates }
        } else {
            const methodResults = electionMethods[self.electionMethod](votes)
            const { iWinner } = methodResults
            const winner = candidates[iWinner]
            electionResults = { iWinner, winner }
        }
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

    // -- Menu --

    // a list of election methods
    self.electionMethodList = [
        { name: 'Huntington Hill', value: 'huntingtonHill', type: 'allocation' },
        { name: 'Plurality', value: 'plurality', type: 'singleWinner' },
        { name: 'Random Winner', value: 'randomWinner', type: 'singleWinner' },
    ]

    // utilities for looking up this list
    self.checkElectionType = () => self.electionMethodListByFunctionName[self.electionMethod].type
    self.electionMethodListByFunctionName = []
    self.electionMethodList.forEach(
        (x) => { self.electionMethodListByFunctionName[x.value] = x },
    )

    // add a menu item to switch between types of elections
    self.electionMethod = 'plurality'
    menu.addMenuItem(
        self,
        {
            label: 'Election Method:',
            prop: 'electionMethod',
            options: self.electionMethodList,
            change: ['electionMethod'],
        },
    )
}
