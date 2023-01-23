/** @module */

import { socialChoiceMethodMetadataByFunctionName } from '../socialChoiceMethods/socialChoiceMethods.js'
import CastOptions from './CastOptions.js'
import SocialChoiceOptions from './SocialChoiceOptions.js'

/**
 * Here we are in the context of a single election.
 * @constructor
 */
export default function ElectionOptions(changes, simOptions) {
    const self = this

    self.castOptions = new CastOptions(changes, simOptions, self)
    self.socialChoiceOptions = new SocialChoiceOptions(changes, self)

    self.setSocialChoiceMethod = (functionName) => {
        self.socialChoiceMethod = functionName
        const metadata = socialChoiceMethodMetadataByFunctionName[functionName]
        self.voteCasterName = metadata.voteCasterName
        self.socialChoiceType = metadata.socialChoiceType
    }
    self.setNumDistricts = (n) => {
        self.numDistricts = n
        self.useDistricts = n > 1
    }

    // Defaults
    self.setSocialChoiceMethod('plurality')
    self.setNumDistricts(1)
    changes.add(['socialChoiceMethod', 'numDistricts'])

    self.update = () => {
        self.castOptions.update()
        self.socialChoiceOptions.update()
    }
}
