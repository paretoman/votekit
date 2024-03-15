import { socialChoiceMethodMetadataByFunctionName } from '../../compute/src/socialChoiceMethods/socialChoiceMethods.js'
import SocialChoiceOptionsMan from './SocialChoiceOptionsMan.js'

export default function PhaseOptionsMan(sequenceName, phaseName, changes, commander) {
    const self = this

    const phaseOptions = {
        socialChoiceMethod: 'plurality',
        voteCasterName: 'plurality',
        socialChoiceType: 'singleWinner',
        socialChoiceOptions: {
            seats: 1,
            threshold: 0.1,
        },
    }

    self.socialChoiceOptionsMan = new SocialChoiceOptionsMan(changes, phaseOptions)

    self.setSocialChoiceMethod = commander.addSender({
        name: `sequence-${sequenceName}-phase-${phaseName}-socialChoiceMethod`,
        currentValue: phaseOptions.socialChoiceMethod,
        action(functionName) {
            phaseOptions.socialChoiceMethod = functionName
            const metadata = socialChoiceMethodMetadataByFunctionName[functionName]
            phaseOptions.voteCasterName = metadata.voteCasterName
            phaseOptions.socialChoiceType = metadata.socialChoiceType
            changes.add(['socialChoiceMethod'])
        },
    }).go

    self.init = () => {
        self.setSocialChoiceMethod('plurality')
    }
    self.update = () => {
        self.socialChoiceOptionsMan.update()
        phaseOptions.socialChoiceOptions = self.socialChoiceOptionsMan.getOptions()
    }
    self.getOptions = () => {
        const po = { ...phaseOptions }
        po.socialChoiceOptions = self.socialChoiceOptionsMan.getOptions()

        return po
    }
}
