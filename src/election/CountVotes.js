/** @module */

import electionMethods from '../electionMethods/electionMethods.js'

/**
 * Store settings and functions that deal with the election method.
 * The difference between CountVotes and Election is that
 * Election encompasses all concepts of an election such as casting a vote
 * or the number of dimensions,
 * while CountVotes just considers the votes and the result of counting.
 * Then CountVotes returns a summary of how the election went.
 * Perhaps CountingMethod is a more specific name.
 * @param {Menu} menu
 * @constructor
 */
export default function CountVotes(menu) {
    const self = this

    self.seats = 1

    self.run = (canList, votes) => {
        // why have two different kinds of results?
        // countResults, the smaller one,
        //   is in the context of the election method,
        //   which has tallies go in and analysis come out
        // electionResults, the larger one,
        //   is in the context of candidate objects and voter objects.
        let electionResults
        if (self.checkElectionType() === 'allocation') {
            const electionMethodOptions = { seats: self.seats, threshold: 0.1 }
            const countResults = electionMethods[self.electionMethod](votes, electionMethodOptions)
            const { allocation } = countResults
            electionResults = { allocation, canList, votes }
        } else {
            const countResults = electionMethods[self.electionMethod](votes)
            const { iWinner } = countResults
            const winner = canList[iWinner]
            electionResults = { iWinner, winner, votes }
        }
        return electionResults
    }

    // -- Menu --

    // a list of election methods
    self.electionMethodList = [
        {
            name: 'Huntington Hill', value: 'huntingtonHill', type: 'allocation', caster: 'castPlurality',
        },
        {
            name: 'Plurality', value: 'plurality', type: 'singleWinner', caster: 'castPlurality',
        },
        {
            name: 'Random Winner', value: 'randomWinner', type: 'singleWinner', caster: 'castPlurality',
        },
        {
            name: 'Score', value: 'score', type: 'singleWinner', caster: 'castScore',
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
        self.caster = self.electionMethodListByFunctionName[value].caster

        if (self.checkElectionType() === 'allocation') {
            self.seats = 5
        } else {
            self.seats = 1
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
