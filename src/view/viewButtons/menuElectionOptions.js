import { socialChoiceMethodMetadata } from '../../election/socialChoiceMethods/socialChoiceMethods.js'

export default function menuElectionOptions(electionOptions, menu) {
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
            { name: '20', value: 20 },
        ],
        changeList: ['numTracts'],
        getValue: () => electionOptions.numTracts,
        onChoose: (o) => {
            electionOptions.setNumTracts(o.value)
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
            { name: '20', value: 20 },
        ],
        changeList: ['numDistricts'],
        getValue: () => electionOptions.numDistricts,
        onChoose: (o) => {
            electionOptions.setNumDistricts(o.value)
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
        getValue: () => electionOptions.socialChoiceMethod,
        onChoose: (o) => {
            electionOptions.setSocialChoiceMethod(o.value)
        },
    })
}
