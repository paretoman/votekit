/** @module */

import { socialChoiceMethodMetadataByFunctionName } from '../../election/src/socialChoiceMethods/socialChoiceMethods.js'
import CastOptionsMan from './CastOptionsMan.js'
import SocialChoiceOptionsMan from './SocialChoiceOptionsMan.js'

/**
 * Here we are in the context of a single election.
 * @constructor
 */
export default function ElectionOptionsMan(changes, simOptions, commander) {
    const self = this

    const electionOptions = {
        pollCount: 5,
    }
    self.castOptionsMan = new CastOptionsMan(changes, simOptions, electionOptions)
    self.socialChoiceOptionsMan = new SocialChoiceOptionsMan(changes, electionOptions)

    self.init = () => {
        // Defaults
        self.setSocialChoiceMethod('plurality')
        self.setNumTracts(1)
        self.setNumDistricts(1)
    }

    self.setSocialChoiceMethod = commander.addSender({
        name: 'socialChoiceMethod',
        currentValue: electionOptions.socialChoiceMethod,
        action(functionName) {
            electionOptions.socialChoiceMethod = functionName
            const metadata = socialChoiceMethodMetadataByFunctionName[functionName]
            electionOptions.voteCasterName = metadata.voteCasterName
            electionOptions.socialChoiceType = metadata.socialChoiceType
            changes.add(['socialChoiceMethod'])
        },
    }).go

    self.setNumDistricts = commander.addSender({
        name: 'numDistricts',
        currentValue: electionOptions.numDistricts,
        action(n) {
            electionOptions.numDistricts = n
            electionOptions.useDistricts = n > 1
            electionOptions.useGeography = electionOptions.useTracts || electionOptions.useDistricts
            changes.add(['numDistricts'])
        },
    }).go

    self.setNumTracts = commander.addSender({
        name: 'numTracts',
        currentValue: electionOptions.numTracts,
        action(n) {
            electionOptions.numTracts = n
            electionOptions.useTracts = n > 1
            electionOptions.useGeography = electionOptions.useTracts || electionOptions.useDistricts
            changes.add(['numTracts'])
        },
    }).go

    self.update = () => {
        self.castOptionsMan.update()
        self.socialChoiceOptionsMan.update()
    }

    self.getOptions = () => {
        const eo = { ...electionOptions }
        eo.castOptions = self.castOptionsMan.getOptions()
        eo.socialChoiceOptions = self.socialChoiceOptionsMan.getOptions()
        return eo
    }

    self.init()
}
