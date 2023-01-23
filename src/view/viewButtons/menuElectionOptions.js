import { socialChoiceMethodMetadata } from '../../election/socialChoiceMethods/socialChoiceMethods.js'

export default function menuElectionOptions(electionOptions, menu) {
    const useDistrictsList = [
        { name: '20', value: 20 },
        { name: '5', value: 5 },
        { name: '1', value: 1 },
    ]
    menu.addMenuItem(
        electionOptions,
        {
            label: 'Number of Districts:',
            prop: 'numDistricts',
            setProp: (p) => { electionOptions.setNumDistricts(p) },
            options: useDistrictsList,
            change: ['numDistricts'],
        },
    )

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
