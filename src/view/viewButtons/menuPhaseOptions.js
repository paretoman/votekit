import { socialChoiceMethodMetadata } from '@paretoman/votekit-social-choice-methods'

export default function menuPhaseOptions(sequenceName, phaseName, phaseNameTitle, electionOptionsMan, menu) {
    menu.addMenuItem({
        label: `Social Choice Method for ${phaseNameTitle} Phase:`,
        explain: 'The method of choosing winners from a set of prospective candidates.',
        options: socialChoiceMethodMetadata.map(
            ({ shortName, functionName, name, explain }) => (
                { name: shortName, value: functionName, explain: explain || name }
            ),
        ),
        changeList: ['socialChoiceMethod'],
        getValue: () => electionOptionsMan.sequenceOptionsMan.sequences[sequenceName].phases[phaseName].getOptions().socialChoiceMethod,
        onChoose: (o) => {
            electionOptionsMan.sequenceOptionsMan.sequences[sequenceName].phases[phaseName].setSocialChoiceMethod(o.value)
        },
        checkShow: () => (sequenceName === electionOptionsMan.getOptions().sequenceOptions.sequenceName),
    })
}
