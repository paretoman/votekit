export default function menuElectionOptions(electionOptions, menu) {
    menu.addMenuItem(
        electionOptions,
        {
            label: 'Election Method:',
            prop: 'electionMethod',
            setProp: electionOptions.setElectionMethod,
            options: electionOptions.electionMethodList,
            change: ['electionMethod'],
        },
    )
}
