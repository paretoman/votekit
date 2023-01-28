/** @module */

import { socialChoiceMethodMetadataByFunctionName } from '../socialChoiceMethods/socialChoiceMethods.js'
import CastOptions from './CastOptions.js'
import SocialChoiceOptions from './SocialChoiceOptions.js'

/**
 * Here we are in the context of a single election.
 * @constructor
 */
export default function ElectionOptions(changes, simOptions, commander) {
    const self = this

    self.castOptions = new CastOptions(changes, simOptions, self)
    self.socialChoiceOptions = new SocialChoiceOptions(changes, self)

    self.init = () => {
        // Defaults
        self.setSocialChoiceMethod('plurality')
        self.setNumDistricts(1)
    }

    self.setSocialChoiceMethod = commander.addSender({
        name: 'socialChoiceMethod',
        currentValue: self.socialChoiceMethod,
        action(functionName) {
            self.socialChoiceMethod = functionName
            const metadata = socialChoiceMethodMetadataByFunctionName[functionName]
            self.voteCasterName = metadata.voteCasterName
            self.socialChoiceType = metadata.socialChoiceType
            changes.add(['socialChoiceMethod'])
        },
    }).go

    self.setNumDistricts = commander.addSender({
        name: 'numDistricts',
        currentValue: self.numDistricts,
        action(n) {
            self.numDistricts = n
            self.useDistricts = n > 1
            changes.add(['numDistricts'])
        },
    }).go

    self.update = () => {
        self.castOptions.update()
        self.socialChoiceOptions.update()
    }

    self.init()
}