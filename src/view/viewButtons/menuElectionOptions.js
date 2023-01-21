export default function menuElectionOptions(electionOptions, menu) {
    menu.addMenuItem(
        electionOptions,
        {
            label: 'Election Method:',
            prop: 'socialChoiceMethod',
            setProp: electionOptions.setSocialChoiceMethod,
            options: electionOptions.socialChoiceMethodList,
            change: ['socialChoiceMethod'],
        },
    )
}
