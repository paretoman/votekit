import socialChoiceMethodMetadata from '../../election/socialChoiceMethods/socialChoiceMethodMetadata.js'

export default function menuElectionOptions(electionOptions, menu) {
    // a list of social choice methods
    const socialChoiceMethodList = socialChoiceMethodMetadata.map(
        ({ shortName, functionName }) => ({ name: shortName, value: functionName }),
    )
    menu.addMenuItem(
        electionOptions,
        {
            label: 'Election Method:',
            prop: 'socialChoiceMethod',
            setProp: electionOptions.setSocialChoiceMethod,
            options: socialChoiceMethodList,
            change: ['socialChoiceMethod'],
        },
    )
}
