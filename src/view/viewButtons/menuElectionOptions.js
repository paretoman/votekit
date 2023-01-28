import { socialChoiceMethodMetadata } from '../../election/socialChoiceMethods/socialChoiceMethods.js'

export default function menuElectionOptions(electionOptions, menu) {
    menu.addMenuItem({
        label: 'Number of Districts:',
        options: [
            { name: '20', value: 20 },
            { name: '5', value: 5 },
            { name: '1', value: 1 },
        ],
        changeList: ['numDistricts'],
        getValue: () => electionOptions.numDistricts,
        onChoose: (o) => {
            electionOptions.setNumDistricts(o.value)
        },
    })

    menu.addMenuItem({
        label: 'Election Method:',
        options: socialChoiceMethodMetadata.map(
            ({ shortName, functionName }) => ({ name: shortName, value: functionName }),
        ),
        changeList: ['socialChoiceMethod'],
        getValue: () => electionOptions.socialChoiceMethod,
        onChoose: (o) => {
            electionOptions.setSocialChoiceMethod(o.value)
        },
    })
}
