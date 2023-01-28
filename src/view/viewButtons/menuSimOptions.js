/**
 * Add simOptions to Menu.
 * @param {*} simOptions
 * @param {*} menu
 */
export default function menuSimOptions(simOptions, menu) {
    menu.addMenuItem({
        label: 'Mode:',
        options: [
            { name: 'One Election', value: 'one' },
            { name: 'Sample Elections', value: 'sample' },
        ],
        changeList: ['mode'],
        getValue: () => simOptions.mode,
        onChoose: (o) => {
            simOptions.setMode(o.value)
        },
    })

    menu.addMenuItem({
        label: 'Dimensions:',
        options: [
            { name: '1D', value: 1 },
            { name: '2D', value: 2 },
        ],
        changeList: ['dimensions'],
        getValue: () => simOptions.dimensions,
        onChoose: (o) => {
            simOptions.setDimensions(o.value)
        },
    })
}
