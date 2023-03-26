import menuPhaseOptions from './menuPhaseOptions.js'

export default function menuElectionOptions(electionOptionsMan, menu) {
    menu.addMenuItem({
        label: 'Number of Census Tracts:',
        explain: 'Tracts add some geography into the election. '
        + 'Tracts are the pixels of the geography. Voters live in tracts. '
        + 'In each tract, the voters are moved in policy space according to a random algorithm called simplex noise. '
        + 'The main feature is that neighboring tracts are similar to each other. '
        + 'This options sets the number of tracts along one axis. ',
        options: [
            { name: '1', value: 1 },
            { name: '9', value: 9 },
        ],
        changeList: ['numTracts'],
        getValue: () => electionOptionsMan.getOptions().numTracts,
        onChoose: (o) => {
            electionOptionsMan.setNumTracts(o.value)
        },
    })

    menu.addMenuItem({
        label: 'Number of Districts:',
        explain: 'Districts are one way to try to introduce proprtionality into an election. '
        + 'Districts are drawn across tracts. '
        + 'Elections results are summed across the districts. '
        + 'Each district has one or more winners. ',
        options: [
            { name: '1', value: 1 },
            { name: '9', value: 9 },
        ],
        changeList: ['numDistricts'],
        getValue: () => electionOptionsMan.getOptions().numDistricts,
        onChoose: (o) => {
            electionOptionsMan.setNumDistricts(o.value)
        },
    })

    menu.addMenuItem({
        label: 'Election Sequence:',
        explain: 'An election may be composed of phases of casting votes and determining winners. '
        + 'A primary may be closed or open. '
        + 'A closed primary only allows voters of a party to vote. '
        + 'A nonpartisan open primary allows any voter to vote for any candidate. '
        + 'A general follows the primary. ',
        options: [
            { name: 'General', value: 'general', explain: 'One general phase.' },
            { name: 'Closed P', value: 'closedPrimary', explain: 'A closed primary followed by a general phase.' },
            { name: 'Nonp Open P', value: 'nonpartisanOpenPrimary', explain: 'A nonpartisan open primary followed by a general phase.' },
        ],
        changeList: ['sequenceName'],
        getValue: () => electionOptionsMan.sequenceOptionsMan.getOptions().sequenceName,
        onChoose: (o) => {
            electionOptionsMan.sequenceOptionsMan.setSequenceName(o.value)
        },
    })

    menuPhaseOptions('general', 'general', 'General', electionOptionsMan, menu)
    menuPhaseOptions('closedPrimary', 'closedPrimary', 'Closed Primary', electionOptionsMan, menu)
    menuPhaseOptions('closedPrimary', 'general', 'General', electionOptionsMan, menu)
    menuPhaseOptions('nonpartisanOpenPrimary', 'nonpartisanOpenPrimary', 'Nonpartisan Open Primary', electionOptionsMan, menu)
    menuPhaseOptions('nonpartisanOpenPrimary', 'general', 'General', electionOptionsMan, menu)
}
