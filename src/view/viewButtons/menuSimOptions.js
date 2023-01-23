/**
 * Add simOptions to Menu.
 * @param {*} simOptions
 * @param {*} menu
 */
export default function menuSimOptions(simOptions, menu) {
    const modeList = [
        { name: 'One Election', value: 'one' },
        { name: 'Sample Elections', value: 'sample' },
    ]
    menu.addMenuItem(
        simOptions,
        {
            label: 'Mode:',
            prop: 'mode',
            setProp: (p) => { simOptions.setMode(p) },
            options: modeList,
            change: ['mode'],
        },
    )

    const dimensionList = [
        { name: '1D', value: 1 },
        { name: '2D', value: 2 },
    ]
    menu.addMenuItem(
        simOptions,
        {
            label: 'Dimensions:',
            prop: 'dimensions',
            setProp: (p) => { simOptions.setDimensions(p) },
            options: dimensionList,
            change: ['dimensions'],
        },
    )
}
