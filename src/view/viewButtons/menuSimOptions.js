/**
 * Add simOptions to Menu.
 * @param {*} simOptions
 * @param {*} menu
 */
export default function menuSimOptions(simOptions, menu) {
    menu.addMenuItem({
        label: 'Mode:',
        explain: 'The simulation mode chooses the kind of analysis to do. '
        + 'Either do one election and see more detail or many and get summary stats.',
        options: [
            { name: 'One Election',
                value: 'one',
                explain: 'See the votes from one election.' },
            { name: 'Sample Elections',
                value: 'sample',
                explain: 'See the winning candidates as a density over many elections. '
                + 'The prospective candidates come from a distribution.' },
        ],
        changeList: ['mode'],
        getValue: () => simOptions.mode,
        onChoose: (o) => {
            simOptions.setMode(o.value)
        },
    })

    menu.addMenuItem({
        label: 'Dimensions:',
        explain: 'Set the number of dimensions for policy space. '
        + 'Policy space is where voters make decisions on which candidates to elect. '
        + 'Voters like candidates closer to them. '
        + 'Also, the way this simulation is organized, the 1D position of a candidate or voter '
        + 'is independent from their 2D position. This sim uses just one or the other.',
        options: [
            { name: '1D', value: 1, explain: 'Use only one axis for policy space.' },
            { name: '2D', value: 2, explain: 'Use two axes for policy space.' },
        ],
        changeList: ['dimensions'],
        getValue: () => simOptions.dimensions,
        onChoose: (o) => {
            simOptions.setDimensions(o.value)
        },
    })
}
