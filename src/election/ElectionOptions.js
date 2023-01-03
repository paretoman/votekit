/** @module */

import CastOptions from './CastOptions.js'
import SocialChoiceOptions from './SocialChoiceOptions.js'

/**
 * Here we are in the context of a single election.
 * @param {Menu} menu
 * @constructor
 */
export default function ElectionOptions(menu, changes, simOptions) {
    const self = this

    self.castOptions = new CastOptions(menu, changes, simOptions)
    self.socialChoiceOptions = new SocialChoiceOptions(changes, self)

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
        {
            name: 'Sainte-Lague', value: 'sainteLague', type: 'allocation', casterName: 'plurality',
        },
        {
            name: "d'Hondt", value: 'dHondt', type: 'allocation', casterName: 'plurality',
        },
        {
            name: 'AllocScore', value: 'allocatedScore', type: 'multiWinner', casterName: 'scoreLong',
        },
        {
            name: 'MES', value: 'methodOfEqualShares', type: 'multiWinner', casterName: 'scoreLong',
        },
    ]

    // utilities for looking up this list
    self.electionMethodListByFunctionName = []
    self.electionMethodList.forEach(
        (x) => { self.electionMethodListByFunctionName[x.value] = x },
    )
    self.checkElectionType = () => self.electionMethodListByFunctionName[self.electionMethod].type

    self.setElectionMethod = (functionName) => {
        self.electionMethod = functionName
        self.voteCasterName = self.electionMethodListByFunctionName[self.electionMethod].casterName
        self.electionType = self.electionMethodListByFunctionName[self.electionMethod].type
    }

    // Defaults
    self.setElectionMethod('plurality')
    changes.add(['electionMethod'])

    self.update = () => {
        self.castOptions.update()
        self.socialChoiceOptions.update()
    }

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
