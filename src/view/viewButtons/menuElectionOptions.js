import { socialChoiceMethodMetadata } from '../../election/src/socialChoiceMethods/socialChoiceMethods.js'

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
        label: 'Social Choice Method:',
        explain: 'The method of choosing winners from a set of prospective candidates.',
        options: socialChoiceMethodMetadata.map(
            ({ shortName, functionName, name, explain }) => (
                { name: shortName, value: functionName, explain: explain || name }
            ),
        ),
        changeList: ['socialChoiceMethod'],
        getValue: () => electionOptionsMan.getOptions().socialChoiceMethod,
        onChoose: (o) => {
            electionOptionsMan.sequenceOptions.phases.general.setSocialChoiceMethod(o.value)
        },
    })
}
