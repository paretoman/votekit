/** @module */

import electionMethods from '../electionMethods/electionMethods.js'

/**
 * Store settings and functions that deal with the election method.
 * The difference between SocialChoice and Election is that
 * Election encompasses all concepts of an election such as casting a vote
 * or the number of dimensions,
 * while SocialChoice just considers the votes and the result of the election method.
 * Then SocialChoice returns a summary of how the election went.
 * @param {Menu} menu
 * @constructor
 */
export default function SocialChoice(menu) {
    const self = this

    self.seats = 1

    self.run = (canList, votes, parties) => {
        // why have two different kinds of results?
        // socialChoiceResults, the smaller one,
        //   is in the context of the election method,
        //   which has tallies go in and analysis come out
        // electionResults, the larger one,
        //   is in the context of candidate objects and voter objects.
        if (self.checkElectionType() === 'allocation' || self.checkElectionType() === 'multiWinner') {
            const electionMethodOptions = { seats: self.seats, threshold: 0.1 }
            const electionMethod = electionMethods[self.electionMethod]
            const socialChoiceResults = electionMethod({ votes, parties, electionMethodOptions })
            const { allocation } = socialChoiceResults
            const electionResults = { allocation, canList, votes }
            return electionResults
        }
        const electionMethod = electionMethods[self.electionMethod]
        const socialChoiceResults = electionMethod({ votes, parties })
        const { iWinner } = socialChoiceResults
        const winner = canList[iWinner]
        const electionResults = { iWinner, winner, votes }
        return electionResults
    }

    // -- Menu --

    // a list of election methods
    self.electionMethodList = [
        {
            name: 'Huntington Hill', value: 'huntingtonHill', type: 'allocation', casterName: 'plurality',
        },
        {
            name: 'Plurality', value: 'plurality', type: 'singleWinner', casterName: 'plurality',
        },
        {
            name: 'Random Winner', value: 'randomWinner', type: 'singleWinner', casterName: 'plurality',
        },
        {
            name: 'Score', value: 'score', type: 'singleWinner', casterName: 'score',
        },
        {
            name: 'STV', value: 'stv', type: 'multiWinner', casterName: 'ranking',
        },
        {
            name: 'Minimax', value: 'minimax', type: 'singleWinner', casterName: 'pairwise',
        },
        {
            name: 'OLPR A', value: 'olprA', type: 'multiWinner', casterName: 'olprA',
        },
    ]

    // utilities for looking up this list
    self.checkElectionType = () => self.electionMethodListByFunctionName[self.electionMethod].type
    self.electionMethodListByFunctionName = []
    self.electionMethodList.forEach(
        (x) => { self.electionMethodListByFunctionName[x.value] = x },
    )

    /**
     * Called in onclick.
     * @param {(String|Number|Boolean)} value
     */
    self.setElectionMethod = (value) => {
        self.electionMethod = value
        self.casterName = self.electionMethodListByFunctionName[value].casterName

        const electionType = self.checkElectionType()
        if (electionType === 'allocation') {
            self.seats = 5
            self.numSampleCandidates = 10
        } else if (electionType === 'multiWinner') {
            self.seats = 3
            self.numSampleCandidates = 10
        } else {
            self.seats = 1
            self.numSampleCandidates = 5
        }
    }

    // add a menu item to switch between types of elections
    self.setElectionMethod('plurality')

    menu.addMenuItem(
        self,
        {
            label: 'Election Method:',
            prop: 'electionMethod',
            setProp: self.setElectionMethod,
            options: self.electionMethodList,
            change: ['electionMethod'],
        },
    )
}
