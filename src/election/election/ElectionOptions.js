/** @module */

import CastOptions from './CastOptions.js'
import SocialChoiceOptions from './SocialChoiceOptions.js'

/**
 * Here we are in the context of a single election.
 * @param {Menu} menu
 * @constructor
 */
export default function ElectionOptions(changes, simOptions) {
    const self = this

    self.castOptions = new CastOptions(changes, simOptions)
    self.socialChoiceOptions = new SocialChoiceOptions(changes, self)

    // a list of social choice methods
    self.socialChoiceMethodList = [
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
    self.socialChoiceMethodListByFunctionName = []
    self.socialChoiceMethodList.forEach(
        (x) => { self.socialChoiceMethodListByFunctionName[x.value] = x },
    )

    self.setSocialChoiceMethod = (functionName) => {
        self.socialChoiceMethod = functionName
        self.voteCasterName = self.socialChoiceMethodListByFunctionName[self.socialChoiceMethod].casterName
        self.socialChoiceType = self.socialChoiceMethodListByFunctionName[self.socialChoiceMethod].type
    }

    // Defaults
    self.setSocialChoiceMethod('plurality')
    changes.add(['socialChoiceMethod'])

    self.update = () => {
        self.castOptions.update()
        self.socialChoiceOptions.update()
    }
}
