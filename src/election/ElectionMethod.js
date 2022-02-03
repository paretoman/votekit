/** @module */

import electionMethods from '../electionMethods/electionMethods.js'

/**
 * Store settings and functions that deal with the election method.
 * @param {Candidate[]} candidates
 * @param {Menu} menu
 */
export default function ElectionMethod(candidates, menu) {
    const self = this

    self.run = (votes) => {
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
            setProp: (p) => { self.electionMethod = p },
            options: self.electionMethodList,
            change: ['electionMethod'],
        },
    )
}
